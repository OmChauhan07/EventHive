
// imports
const mongoose = require('mongoose');

// ticket type
const TicketTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true, 
  },
  saleStartDate: {
    type: Date,
    required: true,
  },
  saleEndDate: {
    type: Date,
    required: true,
  },
});

// event schema
const EventSchema = new mongoose.Schema({
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  title: {
    type: String,
    required: [true, 'Please add an event title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  date: {
    type: Date,
    required: [true, 'Please add an event date'],
  },
  location: {
    type: String,
    required: [true, 'Please add a location'],
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['Workshop', 'Concert', 'Sports', 'Hackathon', 'Community', 'Other'],
  },
  image: {
    type: String, 
    default: 'no-photo.jpg',
  },
  ticketTypes: [TicketTypeSchema], 
  isPublished: {
    type: Boolean,
    default: false, 
  },
}, {
  timestamps: true,
});

// export model
module.exports = mongoose.model('Event', EventSchema);