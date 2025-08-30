import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AttendeeDashboard from './pages/AttendeeDashboard';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MyTicketsPage from './pages/MyTicketsPage';
import EventDetailPage from './pages/EventDetailPage';
import CreateEventPage from './pages/organizer/CreateEventPage';
import OrganizerDashboard from './pages/organizer/OrganizerDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-900">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<AttendeeDashboard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/my-tickets" element={<MyTicketsPage />} />
            <Route path="/events/:id" element={<EventDetailPage />} />
            <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />
            <Route path="/organizer/create-event" element={<CreateEventPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;