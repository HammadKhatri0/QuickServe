const express = require('express');
const router = express.Router();
const {
  createBooking,
  getAllBookings,
  deleteBooking,
} = require('../controllers/bookingController');

router.route('/')
  .post(createBooking)
  .get(getAllBookings);

router.route('/:id')
  .delete(deleteBooking);

module.exports = router;
