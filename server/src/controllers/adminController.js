import User from "../models/User.js";
import ProviderProfile from "../models/ProviderProfile.js";
import ServiceRequest from "../models/ServiceRequests.js";
import Payment from "../models/Payment.js";

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

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalProviders,
        totalRequests,
        totalPayments
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

