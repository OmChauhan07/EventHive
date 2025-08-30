// imports
const express = require('express');
const router = express.Router();
// Clean up imports to bring in all functions at once
const { registerUser, loginUser, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// register route
router.post('/register', registerUser);

// login route
router.post('/login', loginUser);

// add route to get user data
// this is a protected route, only a logged-in user can access it
router.get('/me', protect, getMe);

// oauth route
router.get('/google', (req, res) => {
  res.send('Logging in with Google');
});

// oauth reponse
router.get('/google/callback', (req, res) => {
  res.send('Google callback');
});

// export router
module.exports = router;

