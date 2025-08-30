// imports
const Booking = require('../models/Booking');

// user's booked tickets
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ attendee: req.user.id }) // find booking of the logged in user
      .populate('event', 'title date location image') // to change the event field in actual event data
      .sort({ bookingDate: -1 }); // sort by booking date in descending order

    res.json(bookings); // return the result
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getMyBookings,
};