import Service from "../models/Service.js";

/**
 * @desc    Create new service (Admin only)
 * @route   POST /api/services
 */
export const createService = async (req, res) => {
  try {
    const { name, description, category, price, image, isPopular } = req.body;

    const service = await Service.create({
      name,
      description,
      category,
      price,
      image,
      isPopular,
    });

    res.status(201).json({
      success: true,
      message: "Service created successfully",
      data: service,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to create service",
    });
  }
};


/**
 * @desc    Get all active services
 * @route   GET /api/services
 */
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true });

    res.status(200).json({
      success: true,
      data: services,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch services",
    });
  }
};


/**
 * @desc    Get popular services
 * @route   GET /api/services/popular
 */
export const getPopularServices = async (req, res) => {
  try {
    const services = await Service.find({
      isPopular: true,
      isActive: true,
    });

    res.status(200).json({
      success: true,
      data: services,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch popular services",
    });
  }
};


/**
 * @desc    Get single service
 * @route   GET /api/services/:id
 */
export const getSingleService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch service",
    });
  }
};


/**
 * @desc    Update service (Admin only)
 * @route   PUT /api/services/:id
 */
export const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Service updated successfully",
      data: updatedService,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update service",
    });
  }
};


/**
 * @desc    Delete service (soft delete)
 * @route   DELETE /api/services/:id
 */
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    service.isActive = false;
    await service.save();

    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete service",
    });
  }
};
