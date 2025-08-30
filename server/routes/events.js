// imports
const express = require('express');
const router = express.Router();
// Import all the necessary functions from the event controller
const {
  getEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

// routes for getting all events or creating a new one
router.route('/')
  // public calls to get all events
  .get(getEvents)
  // protected calls for Organizers to create an event
  .post(protect, authorize('Organizer'), createEvent);

// routes for a single event, identified by its ID (e.g., /api/events/12345)
router.route('/:id')
  // anyone can view a single event's details
  .get(getEventById)
  // only an Organizer can update an event
  .put(protect, authorize('Organizer'), updateEvent)
  // only an Organizer can delete an event
  .delete(protect, authorize('Organizer'), deleteEvent);


// export router
module.exports = router;

