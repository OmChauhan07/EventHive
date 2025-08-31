import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { EventProvider } from './contexts/EventContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AttendeeDashboard from './pages/AttendeeDashboard';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import OTPVerificationPage from './pages/OTPVerificationPage';
import OTPDebugPage from './pages/OTPDebugPage';
import MyTicketsPage from './pages/MyTicketsPage';
import EventDetailPage from './pages/EventDetailPage';
import CreateEventPage from './pages/organizer/CreateEventPage';
import EditEventPage from './pages/organizer/EditEventPage';
import OrganizerDashboard from './pages/organizer/OrganizerDashboard';

function App() {
  return (
    <AuthProvider>
      <EventProvider>
        <Router>
          <div className="min-h-screen bg-gray-900">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<AttendeeDashboard />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/verify-otp" element={<OTPVerificationPage />} />
              <Route path="/debug/otp" element={<OTPDebugPage />} />
              <Route path="/my-tickets" element={<MyTicketsPage />} />
              <Route path="/events/:id" element={<EventDetailPage />} />
              <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />
              <Route path="/organizer/create-event" element={<CreateEventPage />} />
              <Route path="/organizer/edit-event/:id" element={<EditEventPage />} />
            </Routes>
          </div>
        </Router>
      </EventProvider>
    </AuthProvider>
  );
}

export default App;