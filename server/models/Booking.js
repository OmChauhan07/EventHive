const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event', // Creates a direct link to the Event model
    required: true,
  },
  attendee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Creates a direct link to the User model
    required: true,
  },
  ticketType: {
    name: { type: String, required: true }, // e.g., "VIP", "General Admission"
    price: { type: Number, required: true },
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  bookingId: {
    type: String,
    required: true,
    unique: true,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Booking', BookingSchema);

