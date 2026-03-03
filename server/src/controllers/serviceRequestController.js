import ServiceRequest from "../models/ServiceRequests.js";

export const createServiceRequest = async (req, res) => {
  try {
    const {
      category,           // ✅ MUST BE HERE
      serviceType,
      serviceAddress,
      preferredDate,
      estimatedPrice,
      description
    } = req.body;

    console.log("Incoming Body:", req.body); // 👈 Add this for safety

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
      category,          // ✅ MUST SAVE THIS
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