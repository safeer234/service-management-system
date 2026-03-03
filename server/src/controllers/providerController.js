import ServiceRequest from "../models/ServiceRequests.js";
import Provider from "../models/ProviderProfile.js";
import Payment from "../models/Payment.js";
import mongoose from "mongoose";

/* ======================================================
   GET AVAILABLE REQUESTS (CATEGORY BASED)
====================================================== */
export const getAvailableRequests = async (req, res) => {
  try {
    const providerProfile = await Provider.findOne({
      user: req.user.id,
      verificationStatus: "approved",
      availability: true
    }).lean();

    if (!providerProfile) {
      return res.status(403).json({
        success: false,
        message: "Provider not verified or unavailable"
      });
    }

    const requests = await ServiceRequest.find({
      status: "pending",
      provider: null, // 🔥 VERY IMPORTANT
      category: { $in: providerProfile.services }
    })
      .populate("client", "username email")
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests
    });

  } catch (error) {
    console.error("Fetch available requests error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch service requests"
    });
  }
};

/* ======================================================
   ACCEPT SERVICE REQUEST
====================================================== */
export const acceptServiceRequest = async (req, res) => {
  try {
    const request = await ServiceRequest.findOne({
      _id: req.params.id,
      status: "pending",
      provider: null
    });

    if (!request) {
      return res.status(400).json({
        success: false,
        message: "Service request not available"
      });
    }

    request.provider = req.user.id;
    request.status = "accepted";
    await request.save();

    await Payment.findOneAndUpdate(
      { serviceRequest: request._id },
      { provider: req.user.id }
    );

    res.status(200).json({
      success: true,
      message: "Service request accepted successfully"
    });

  } catch (error) {
    console.error("Accept error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to accept service request"
    });
  }
};

/* ======================================================
   REJECT SERVICE REQUEST
====================================================== */
export const rejectServiceRequest = async (req, res) => {
  try {
    const request = await ServiceRequest.findById(req.params.id);

    if (!request || request.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending requests can be rejected"
      });
    }

    // ❗ Do NOT assign provider when rejecting
    request.status = "cancelled";
    await request.save();

    await Payment.findOneAndUpdate(
      { serviceRequest: request._id },
      { status: "cancelled" }
    );

    res.status(200).json({
      success: true,
      message: "Service request rejected"
    });

  } catch (error) {
    console.error("Reject error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to reject service request"
    });
  }
};

/* ======================================================
   GET MY REQUESTS
====================================================== */
export const getMyRequests = async (req, res) => {
  try {
    const requests = await ServiceRequest.find({
      provider: req.user.id
    })
      .populate("client", "username email")
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      data: requests
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch provider requests"
    });
  }
};

/* ======================================================
   COMPLETE SERVICE
====================================================== */
export const completeService = async (req, res) => {
  try {
    const request = await ServiceRequest.findOne({
      _id: req.params.id,
      provider: req.user.id
    });

    if (!request) {
      return res.status(403).json({
        success: false,
        message: "Not authorized"
      });
    }

    request.status = "completed";
    await request.save();

    await Provider.findOneAndUpdate(
      { user: req.user.id },
      { $inc: { completedJobs: 1 } }
    );

    res.status(200).json({
      success: true,
      message: "Service marked as completed"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to complete service"
    });
  }
};

/* ======================================================
   PROVIDER EARNINGS
====================================================== */
export const getProviderEarnings = async (req, res) => {
  try {
    const providerId = new mongoose.Types.ObjectId(req.user.id);

    const payments = await Payment.find({
      provider: providerId,
      status: "paid"
    }).lean();

    const totalEarnings = payments.reduce(
      (sum, payment) => sum + payment.amount,
      0
    );

    res.status(200).json({
      success: true,
      totalEarnings,
      payments
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch earnings"
    });
  }
};

/* ======================================================
   PROVIDER DASHBOARD
====================================================== */
export const getProviderDashboard = async (req, res) => {
  try {
    const providerId = req.user.id;

    const totalRequests = await ServiceRequest.countDocuments({
      provider: providerId
    });

    const acceptedRequests = await ServiceRequest.countDocuments({
      provider: providerId,
      status: "accepted"
    });

    const completedRequests = await ServiceRequest.countDocuments({
      provider: providerId,
      status: "completed"
    });

    const earnings = await Payment.aggregate([
      {
        $match: {
          provider: new mongoose.Types.ObjectId(providerId),
          status: "paid"
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" }
        }
      }
    ]);

    const recentRequests = await ServiceRequest.find({
      provider: providerId
    })
      .populate("client", "username email")
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    res.status(200).json({
      success: true,
      data: {
        totalRequests,
        acceptedRequests,
        completedRequests,
        totalEarnings: earnings[0]?.total || 0,
        recentRequests
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch provider dashboard"
    });
  }
};