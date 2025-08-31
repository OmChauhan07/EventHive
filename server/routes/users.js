// server/routes/users.js
const express = require('express');
const router = express.Router();
const { getMyBookings } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Defines the route GET /api/users/my-bookings
router.get('/my-bookings', protect, getMyBookings);

module.exports = router;