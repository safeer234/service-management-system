import ServiceRequest from "../models/ServiceRequests.js";
import ProviderProfile from "../models/ProviderProfile.js";
import Payment from "../models/Payment.js";

/**
 * @desc   Get service requests available for provider
 * @route  GET /api/provider/requests
 */
export const getAvailableRequests = async (req, res) => {
  try {
    // Get provider profile
    const providerProfile = await ProviderProfile.findOne({
      user: req.user.id,
      verificationStatus: "approved",
      availability: true
    });

    if (!providerProfile) {
      return res.status(403).json({
        success: false,
        message: "Provider not verified or unavailable"
      });
    }

    // Find pending requests matching provider services
    const requests = await ServiceRequest.find({
      serviceType: { $in: providerProfile.services },
      status: "pending"
    }).populate("client", "name email");

    res.status(200).json({
      success: true,
      data: requests
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch service requests"
    });
  }
};

/**
 * @desc   Accept a service request
 * @route  PUT /api/provider/request/:id/accept
 */
export const acceptServiceRequest = async (req, res) => {
  try {
    const request = await ServiceRequest.findById(req.params.id);

    if (!request || request.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Service request not available"
      });
    }

    request.provider = req.user.id;
    request.status = "accepted";

    await request.save();

    // Update payment provider reference
    await Payment.findOneAndUpdate(
      { serviceRequest: request._id },
      { provider: req.user.id }
    );

    res.status(200).json({
      success: true,
      message: "Service request accepted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to accept service request"
    });
  }
};

/**
 * @desc   Get provider's assigned requests
 * @route  GET /api/provider/my-requests
 */
export const getMyRequests = async (req, res) => {
  try {
    const requests = await ServiceRequest.find({
      provider: req.user.id
    }).populate("client", "name email");

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

/**
 * @desc   Mark service as completed
 * @route  PUT /api/provider/request/:id/complete
 */
export const completeService = async (req, res) => {
  try {
    const request = await ServiceRequest.findById(req.params.id);

    if (!request || request.provider.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to complete this service"
      });
    }

    request.status = "completed";
    await request.save();

    // Update provider stats
    await ProviderProfile.findOneAndUpdate(
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

/**
 * @desc   Get provider earnings
 * @route  GET /api/provider/earnings
 */
export const getProviderEarnings = async (req, res) => {
  try {
    const payments = await Payment.find({
      provider: req.user.id,
      status: "paid"
    });

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


import ServiceRequest from "../models/ServiceRequest.js";
import Payment from "../models/Payment.js";

export const getProviderDashboard = async (req, res) => {
  try {
    const providerId = req.user.id;

    const totalRequests = await ServiceRequest.countDocuments({
      provider: providerId,
    });

    const pendingRequests = await ServiceRequest.countDocuments({
      provider: providerId,
      status: "pending",
    });

    const completedRequests = await ServiceRequest.countDocuments({
      provider: providerId,
      status: "completed",
    });

    const earnings = await Payment.aggregate([
      {
        $match: {
          provider: providerId,
          status: "paid",
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    const recentRequests = await ServiceRequest.find({
      provider: providerId,
    })
      .populate("user", "username email")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      data: {
        totalRequests,
        pendingRequests,
        completedRequests,
        totalEarnings: earnings[0]?.total || 0,
        recentRequests,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch provider dashboard",
    });
  }
};