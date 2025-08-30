const express = require('express');
const router = express.Router();
const { createBooking } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

// Any user must be logged in to create a booking
router.route('/').post(protect, createBooking);

module.exports = router;
