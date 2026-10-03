const Contact = require('../models/Contact');

// @desc    Submit a contact message
// @route   POST /api/contact
exports.createContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email' });
    }
    if (!phone || !phone.trim()) {
      return res.status(400).json({ success: false, message: 'Phone number is required' });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      message: message.trim(),
    });

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! Our team will get back to you shortly.',
      data: contact,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to submit contact message',
    });
  }
};

// @desc    Get all contact submissions
// @route   GET /api/contact
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching contacts',
      error: error.message,
    });
  }
};
