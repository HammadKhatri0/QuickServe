const Service = require('../models/Service');

// @desc    Get all services (supports optional ?search= query)
// @route   GET /api/services
exports.getAllServices = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search && search.trim() !== '') {
      query = {
        $or: [
          { name: { $regex: search.trim(), $options: 'i' } },
          { description: { $regex: search.trim(), $options: 'i' } },
        ],
      };
    }

    const services = await Service.find(query).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching services',
      error: error.message,
    });
  }
};

// @desc    Get single service by ID
// @route   GET /api/services/:id
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }
    res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    // Check if invalid ObjectId format
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Invalid service ID format',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while fetching service',
      error: error.message,
    });
  }
};

// @desc    Create a new service
// @route   POST /api/services
exports.createService = async (req, res) => {
  try {
    const { name, description, price, duration, image } = req.body;

    if (!name || !description || price === undefined || !duration || !image) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, description, price, duration, image',
      });
    }

    const newService = await Service.create({
      name,
      description,
      price: Number(price),
      duration,
      image,
    });

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: newService,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create service',
    });
  }
};

// @desc    Update a service
// @route   PUT /api/services/:id
exports.updateService = async (req, res) => {
  try {
    const { name, description, price, duration, image } = req.body;

    let service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }

    service = await Service.findByIdAndUpdate(
      req.params.id,
      {
        ...(name && { name }),
        ...(description && { description }),
        ...(price !== undefined && { price: Number(price) }),
        ...(duration && { duration }),
        ...(image && { image }),
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Service updated successfully',
      data: service,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to update service',
    });
  }
};

// @desc    Delete a service
// @route   DELETE /api/services/:id
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }

    await Service.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Service deleted successfully',
      id: req.params.id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete service',
    });
  }
};
