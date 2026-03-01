import User from "../models/User.js";
import ProviderProfile from "../models/ProviderProfile.js";
import ServiceRequest from "../models/ServiceRequests.js";
import Payment from "../models/Payment.js";
import Service from "../models/Service.js";

/**
 * @desc   Get admin dashboard summary
 * @route  GET /api/admin/dashboard
 */
export const getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProviders = await ProviderProfile.countDocuments();
    const totalRequests = await ServiceRequest.countDocuments();
    const totalPayments = await Payment.countDocuments({ status: "paid" });
    const totalService = await Service.countDocuments();
    


    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalProviders,
        totalRequests,
        totalPayments,
        totalService
      
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch admin dashboard data"
    });
  }
};

/**
 * @desc   Get all providers (for verification)
 * @route  GET /api/admin/providers
 */
export const getAllProviders = async (req, res) => {
  try {
    const providers = await ProviderProfile.find()
      .populate("user", "name email role");

    res.status(200).json({
      success: true,
      data: providers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch providers"
    });
  }
};

/**
 * @desc   Approve or reject provider
 * @route  PUT /api/admin/providers/:id
 */
export const updateProviderStatus = async (req, res) => {
  try {
    const { status } = req.body; // approved | rejected

    const provider = await ProviderProfile.findById(req.params.id);

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider not found"
      });
    }

    provider.verificationStatus = status;
    await provider.save();

    res.status(200).json({
      success: true,
      message: `Provider ${status} successfully`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update provider status"
    });
  }
};

/**
 * @desc   View all service requests
 * @route  GET /api/admin/requests
 */
export const getAllServiceRequests = async (req, res) => {
  try {
    const requests = await ServiceRequest.find()
      .populate("client", "name email")
      .populate("provider", "name email");

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

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const cancelServiceRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await ServiceRequest.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Prevent cancelling completed booking
    if (booking.status === "completed") {
      return res.status(400).json({
        success: false,
        message: "Cannot cancel a completed booking",
      });
    }

    // If already cancelled
    if (booking.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Booking already cancelled",
      });
    }

    booking.status = "cancelled";
    booking.cancelledBy = "admin"; // optional field (recommended)
    booking.cancelledAt = new Date();

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      data: booking,
    });

  } catch (error) {
    console.error("Admin Cancel Booking Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to cancel booking",
    });
  }
};


export const getPendingProviders = async (req, res) => {
  try {
    const providers = await Provider.find({
      verificationStatus: "pending"
    }).populate("user", "username email phone");

    res.status(200).json({
      success: true,
      data: providers
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch providers"
    });
  }
};

/* ================= APPROVE PROVIDER ================= */

export const approveProvider = async (req, res) => {
  try {
    const provider = await Provider.findByIdAndUpdate(
      req.params.id,
      { verificationStatus: "approved" },
      { new: true }
    );

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Provider approved successfully",
      provider
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error approving provider"
    });
  }
};

/* ================= REJECT PROVIDER ================= */

export const rejectProvider = async (req, res) => {
  try {
    const provider = await Provider.findByIdAndUpdate(
      req.params.id,
      { verificationStatus: "rejected" },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Provider rejected",
      provider
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error rejecting provider"
    });
  }
};
