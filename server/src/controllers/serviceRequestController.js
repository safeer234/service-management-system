import ServiceRequest from "../models/ServiceRequests.js";

export const createServiceRequest = async (req, res) => {
  try {
    const {
      category,
      serviceType,
      serviceAddress,
      preferredDate,
      estimatedPrice,
      description
    } = req.body;

    console.log("BODY RECEIVED:", req.body);

    const serviceRequest = await ServiceRequest.create({
      client: req.user.id,
      category,
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
    console.log("CREATE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create service request"
    });
  }
};