import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, LogOut, Ticket, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 shadow-lg border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-white hover:text-teal-400 transition-colors">
            <Calendar className="h-8 w-8 text-teal-500" />
            <span className="text-xl font-bold">EventHive</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {user ? (
              // Logged in user navigation
              <>
                <span className="text-gray-300 hidden sm:block">
                  Hello, <span className="text-white font-medium">{user.name}</span>
                </span>
                
                {user.role === 'Attendee' && (
                  <Link
                    to="/my-tickets"
                    className="flex items-center space-x-1 text-gray-300 hover:text-teal-400 transition-colors px-3 py-2 rounded-md"
                  >
                    <Ticket className="h-4 w-4" />
                    <span className="hidden sm:block">My Bookings</span>
                  </Link>
                )}

                {user.role === 'Organizer' && (
                  <>
                    <Link
                      to="/organizer/dashboard"
                      className="flex items-center space-x-1 text-gray-300 hover:text-teal-400 transition-colors px-3 py-2 rounded-md"
                    >
                      <User className="h-4 w-4" />
                      <span className="hidden sm:block">Dashboard</span>
                    </Link>
                    <Link
                      to="/organizer/create-event"
                      className="flex items-center space-x-1 text-gray-300 hover:text-green-400 transition-colors px-3 py-2 rounded-md"
                    >
                      <Calendar className="h-4 w-4" />
                      <span className="hidden sm:block">Create Event</span>
                    </Link>
                  </>
                )}

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-300 hover:text-red-400 transition-colors px-3 py-2 rounded-md"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:block">Logout</span>
                </button>
              </>
            ) : (
              // Guest navigation
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-md"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md transition-colors font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;