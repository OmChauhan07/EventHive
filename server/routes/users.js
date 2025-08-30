const express = require('express');
const router = express.Router();
const { getMyBookings } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// A logged-in user can get their own bookings
router.route('/my-bookings').get(protect, getMyBookings);

module.exports = router;
