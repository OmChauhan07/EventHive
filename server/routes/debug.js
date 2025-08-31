// Debug routes - FOR DEVELOPMENT ONLY
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Import mock email service to access sent emails
const { getSentEmails, clearSentEmails } = require('../utils/mockEmailService');

// Get all users with their OTPs (for development purposes only)
router.get('/users', async (req, res) => {
  try {
    // Only allow this in development environment
    if (process.env.NODE_ENV === 'production') {
      return res.status(403).json({ message: 'Not available in production' });
    }
    
    const users = await User.find().select('name email otp otpExpiry isVerified');
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all mock emails sent (for development purposes only)
router.get('/emails', async (req, res) => {
  try {
    // Only allow this in development environment
    if (process.env.NODE_ENV === 'production') {
      return res.status(403).json({ message: 'Not available in production' });
    }
    
    const emails = getSentEmails();
    res.json(emails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Clear all mock emails (for development purposes only)
router.post('/clear-emails', async (req, res) => {
  try {
    // Only allow this in development environment
    if (process.env.NODE_ENV === 'production') {
      return res.status(403).json({ message: 'Not available in production' });
    }
    
    clearSentEmails();
    res.json({ message: 'All mock emails cleared' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;