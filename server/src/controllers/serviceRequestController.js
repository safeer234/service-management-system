import ServiceRequest from "../models/ServiceRequests.js";

export const createServiceRequest = async (req, res) => {
  try {
    const {
      category,            // ✅ NEW
      serviceType,
      serviceAddress,
      preferredDate,
      estimatedPrice,
      description
    } = req.body;

    // 🔎 Basic validation
    if (
      !category ||
      !serviceType ||
      !serviceAddress ||
      !preferredDate ||
      !estimatedPrice ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const serviceRequest = await ServiceRequest.create({
      client: req.user.id,
      category,                 // ✅ SAVED
      serviceType,
      serviceAddress,
      preferredDate,
      estimatedPrice,
      description,
      provider: null,
      status: "pending"
    });

    res.status(201).json({
      success: true,
      message: "Service request created successfully",
      data: serviceRequest
    });

  } catch (error) {
    console.error("Create request error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create service request"
    });
  }
};