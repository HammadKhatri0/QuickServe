const Booking = require('../models/Booking');

// @desc    Create a new booking
// @route   POST /api/bookings
exports.createBooking = async (req, res) => {
  try {
    const { name, email, phone, service, date, address, message } = req.body;

    // Validation
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email' });
    }
    if (!phone || !phone.trim()) {
      return res.status(400).json({ success: false, message: 'Phone number is required' });
    }
    if (!service || !service.trim()) {
      return res.status(400).json({ success: false, message: 'Please select a service' });
    }
    if (!date || !date.trim()) {
      return res.status(400).json({ success: false, message: 'Date is required' });
    }
    if (!address || !address.trim()) {
      return res.status(400).json({ success: false, message: 'Address is required' });
    }

    const booking = await Booking.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      service: service.trim(),
      date: date.trim(),
      address: address.trim(),
      message: message ? message.trim() : '',
    });

    res.status(201).json({
      success: true,
      message: 'Booking submitted successfully! We will contact you soon.',
      data: booking,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to submit booking',
    });
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching bookings',
      error: error.message,
    });
  }
};

// @desc    Delete a booking (bonus for management)
// @route   DELETE /api/bookings/:id
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.status(200).json({ success: true, message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
