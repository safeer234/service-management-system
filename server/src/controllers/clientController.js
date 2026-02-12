import ServiceRequest from "../models/ServiceRequests.js";
import Payment from "../models/Payment.js";

/**
 * @desc   Create a new service request (booking)
 * @route  POST /api/client/request
 */
export const createServiceRequest = async (req, res) => {
  try {
    const {
      serviceType,
      serviceAddress,
      preferredDate,
      estimatedPrice,
      description
    } = req.body;

    const request = await ServiceRequest.create({
      client: req.user.id, // logged-in client
      serviceType,
      serviceAddress,
      preferredDate,
      estimatedPrice,
      description
    });

    // Create payment record (tracking only)
    await Payment.create({
      serviceRequest: request._id,
      client: req.user.id,
      provider: null,
      amount: estimatedPrice,
      status: "pending"
    });

    res.status(201).json({
      success: true,
      message: "Service request created successfully",
      data: request
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create service request"
    });
    console.log(error);
    
  }
};

/**
 * @desc   Get logged-in client's service requests
 * @route  GET /api/client/requests
 */
export const getMyServiceRequests = async (req, res) => {
  try {
    const requests = await ServiceRequest.find({
      client: req.user.id
    }).populate("provider", "name email");

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
 * @desc   Cancel a service request
 * @route  PUT /api/client/request/:id/cancel
 */
export const cancelServiceRequest = async (req, res) => {
  try {
    const request = await ServiceRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Service request not found"
      });
    }

    // Ensure only owner can cancel
    if (request.client.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to cancel this request"
      });
    }

    request.status = "cancelled";
    await request.save();

    res.status(200).json({
      success: true,
      message: "Service request cancelled successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to cancel service request"
    });
  }
};

