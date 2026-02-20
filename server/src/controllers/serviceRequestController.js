import ServiceRequest from "../models/ServiceRequests.js";

export const createServiceRequest = async (req, res) => {
  try {
    const {
      serviceType,
      serviceAddress,
      preferredDate,
      estimatedPrice,
      description
     
    } = req.body;

    const serviceRequest = await ServiceRequest.create({
      client: req.user.id,   // comes from auth middleware
      serviceType,
      serviceAddress,
      preferredDate,
      estimatedPrice,
      description
     
    });

    res.status(201).json({
      success: true,
      message: "Service request created successfully",
      data: serviceRequest
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create service request"
    });
  }
};
