// imports
const Booking = require('../models/Booking');
const Event = require('../models/Event');
const { v4: uuidv4 } = require('uuid'); 

const createBooking = async (req, res) => {
  const { eventId, ticketTypeName, quantity } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    const ticketType = event.ticketTypes.find(t => t.name === ticketTypeName);
    if (!ticketType) {
      return res.status(404).json({ msg: 'Ticket type not found' });
    }

    if (ticketType.quantity < quantity) {
      return res.status(400).json({ msg: 'Not enough tickets available' });
    }


    const newBooking = new Booking({
      event: eventId,
      attendee: req.user.id,
      ticketType: {
        name: ticketType.name,
        price: ticketType.price,
      },
      quantity,
      totalAmount: ticketType.price * quantity,
      bookingId: `EVH-${uuidv4()}`,
    });

    const booking = await newBooking.save();
    res.status(201).json(booking);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  createBooking,
};