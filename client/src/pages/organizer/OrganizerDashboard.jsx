import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Plus, Calendar, Users, DollarSign, Eye, Edit, Trash2 } from 'lucide-react';

const OrganizerDashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.role === 'Organizer') {
      fetchOrganizerEvents();
    }
  }, [user]);

  const fetchOrganizerEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/events/organizer', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      } else {
        setError('Failed to fetch your events');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role !== 'Organizer') {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-400">Only organizers can access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Organizer Dashboard</h1>
            <p className="text-xl text-gray-400">Manage your events and track performance</p>
          </div>
          
          <Link
            to="/organizer/create-event"
            className="mt-4 md:mt-0 bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center group"
          >
            <Plus className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
            Create New Event
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Events</p>
                <p className="text-3xl font-bold text-white">{events.length}</p>
              </div>
              <Calendar className="h-12 w-12 text-teal-400" />
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Attendees</p>
                <p className="text-3xl font-bold text-white">
                  {events.reduce((sum, event) => sum + (event.attendees || 0), 0)}
                </p>
              </div>
              <Users className="h-12 w-12 text-blue-400" />
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Revenue</p>
                <p className="text-3xl font-bold text-white">
                  ${events.reduce((sum, event) => sum + (event.revenue || 0), 0).toLocaleString()}
                </p>
              </div>
              <DollarSign className="h-12 w-12 text-green-400" />
            </div>
          </div>
        </div>

        {/* Events List */}
        <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-white">Your Events</h2>
          </div>
          
          <div className="p-6">
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="bg-gray-700 rounded-lg h-20 animate-pulse" />
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <p className="text-red-400 text-lg mb-4">{error}</p>
                <button
                  onClick={fetchOrganizerEvents}
                  className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg mb-4">No events created yet</p>
                <Link
                  to="/organizer/create-event"
                  className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg transition-colors inline-flex items-center"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Create Your First Event
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event._id} className="bg-gray-700 rounded-lg p-6 border border-gray-600 hover:border-gray-500 transition-colors">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(event.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {event.attendees || 0} attendees
                          </span>
                          <span className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            ${event.revenue || 0}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/events/${event._id}`}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Link>
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </button>
                        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;