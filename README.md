# 🚀 EventHive - Where Events Come Alive
EventHive is a comprehensive, full-stack event management platform built for the Odoo x CGC Mohali Hackathon Finale. It provides a seamless experience for both event organizers to create and manage their events, and for attendees to discover, book, and attend them.

## 🎥 Project Demo
Below is a quick demonstration of the EventHive user interface and core features.
- https://drive.google.com/drive/folders/1xoy-T7p1iK86D_z4b09QQr6JYa8KTuvV?usp=sharing


## ✨ Key Features
EventHive is built with a clear separation of roles, providing a tailored experience for each user type.

### For Attendees
- Event Discovery: Browse a beautiful, responsive grid of upcoming events.

- Search & Filter: Easily find events by category, date, or location.

- Seamless Booking: A simple and secure process to book tickets for any event.

- Attendee Dashboard: A personal dashboard to view all your upcoming and past ticket bookings.

- Digital Tickets: Receive auto-generated tickets with unique QR codes.

### For Organizers
- Effortless Event Creation: An intuitive form to create detailed event pages with multiple ticket tiers (e.g., General, VIP).

- Organizer Dashboard: A central hub to view all your created events, track sales, and manage attendees.

- Role-Based Security: Only users registered as "Organizers" can access the event creation and management tools.

- Live Check-In System: (Future Feature) A QR code scanner to validate tickets and check in attendees in real-time.

## 💻 Tech Stack
This project is a modern MERN-stack application, chosen for its speed, scalability, and rich ecosystem.

- Category

- Technology

- Frontend



- Backend



- Database



- Authentication

- JSON Web Tokens (JWT) & Google OAuth (planned)

- Deployment



## 🛠️ Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
- Node.js (v18.x or later)

- MongoDB installed and running locally.

- Git installed.

## Installation & Setup
1. Clone the repository:

git clone [https://github.com/your-username/eventhive-repo.git](https://github.com/your-username/eventhive-repo.git)
cd eventhive-repo

2. Set up the Backend Server:

# Navigate to the server directory
cd server

# Install dependencies
npm install

### Create a .env file in the root of the /server directory
### and add the following variables:
MONGO_URI=mongodb://localhost:27017/eventhive-db
JWT_SECRET=your_super_secret_key_here

### Start the backend server
- npm start

- The backend server will be running on http://localhost:5000.

3. Set up the Frontend Client:

## Navigate to the client directory from the root folder
cd client

## Install dependencies
npm install

## Start the frontend development server
npm run dev

The frontend application will be available at http://localhost:5173.

# 🚀 API Endpoints
The backend provides a RESTful API for managing users, events, and bookings.

- Method

- Endpoint

- Description

- Access

- POST

- /api/auth/register

- Register a new user.

- Public

  POST/api/auth/login

- Log in an existing user and get a JWT.

- Public

  GET/api/events

Get a list of all published events.

- Public

  POST/api/events

- Create a new event.

- Organizer

  GET/api/events/:id

- Get details for a single event.

- Public

  PUT/api/events/:id

Update an event.

- Organizer

  POST/api/bookings

Create a new booking for an event.

- Attendee

  GET/api/users/my-bookings

Get all bookings for the logged-in user.

Attendee

👤 Author
* OmChauhan07 - GitHub
* aaku2004 - Github
