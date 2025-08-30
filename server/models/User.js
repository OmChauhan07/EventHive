// imports
const mongoose = require('mongoose');

// user schema
const UserSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
  },
  role: { 
    type: String,
    enum: ['Attendee', 'Organizer'],
    default: 'Attendee', 
  },
  otp: {
    type: String,
  },
  otpExpiry: {
    type: Date,
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// export model
module.exports = mongoose.model('User', UserSchema);