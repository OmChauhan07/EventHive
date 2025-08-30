// imports
const Event = require('../models/Event');
const User = require('../models/User');

// GET/ routes
const getEvents = async (req, res) => {
  try {
    const events = await Event.find({ isPublished: true }).sort({ date: 1 });
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// GET a single event by its ID
const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }
        res.json(event);
    } catch (err) {
        console.error(err.message);
        // Also checks for invalid ObjectId format
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Event not found' });
        }
        res.status(500).send('Server Error');
    }
};

// to create new event
const createEvent = async (req, res) => {

  // required fields
  const {
    title,
    description,
    date,
    location,
    category,
    ticketTypes,
    isPublished,
  } = req.body;


  if (!title || !description || !date || !location || !category || !ticketTypes) {
    return res.status(400).json({ msg: 'Please include all required fields' });
  }

  try {
    const newEvent = new Event({
      title,
      description,
      date,
      location,
      category,
      ticketTypes,
      isPublished,
      organizer: req.user.id,
    });

    const event = await newEvent.save();
    res.status(201).json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// to update an existing event
const updateEvent = async (req, res) => {
    try {
        let event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }
        // Check if the user trying to update is the one who created the event
        if (event.organizer.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        // Find the event by its ID and update it with the new data from the request body
        event = await Event.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(event);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// to delete an event
const deleteEvent = async (req, res) => {
    try {
        let event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }
        // Check if the user trying to delete is the one who created the event
        if (event.organizer.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        // Find the event by its ID and remove it from the database
        await Event.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Event removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// export to the router
module.exports = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};

