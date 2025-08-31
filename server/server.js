//imports
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// .env file
dotenv.config();

// to Connect MongoDB
connectDB();

// to create express app
const app = express();

app.use(cors()); // to host diff. API calls
app.use(express.json()); // read JSON data

// --- Main API Routes ---
// Connect all of our route files to the main app
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
// add routes for handling ticket bookings
app.use('/api/bookings', require('./routes/bookings'));
// add routes for user-specific data (like fetching a user's own tickets)
app.use('/api/users', require('./routes/users'));

// Debug routes - only for development
app.use('/api/auth/debug', require('./routes/debug'));

// gives msg if the server is running or not
app.get('/', (req, res) => {
  res.send('API is running successfully!');
});

// define PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

