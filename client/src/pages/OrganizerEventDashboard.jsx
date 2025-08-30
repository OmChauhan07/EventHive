import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getAllEvents } from '../services/eventService';

const OrganizerEventDashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'Organizer')) {
      navigate('/');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user && user.role === 'Organizer') {
      const fetchEvents = async () => {
        try {
          const data = await getAllEvents();
          // Filter events created by this organizer
          const myEvents = (data.events || data || []).filter(event => event.organizer === user.id);
          setEvents(myEvents);
        } catch (err) {
          setError('Failed to load events.');
        } finally {
          setLoading(false);
        }
      };
      fetchEvents();
    }
  }, [user]);

  if (authLoading || loading) return <div className="text-center text-white mt-10">Loading your events...</div>;
  if (error) return <div className="text-center text-red-400 mt-10">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-white mb-8">My Created Events</h1>
      {events.length === 0 ? (
        <div className="text-gray-400">You haven't created any events yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map(event => (
            <div key={event._id} className="bg-gray-800 rounded-xl p-6 shadow-lg flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold text-teal-400 mb-2">{event.title}</h2>
                <p className="text-gray-300 mb-1">{event.location}</p>
                <p className="text-gray-400 text-sm mb-2">{new Date(event.date).toLocaleString()}</p>
                <p className="text-gray-400 mb-4">{event.description}</p>
              </div>
              <Link to={`/organizer/edit-event/${event._id}`} className="mt-2 inline-block bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-center">Edit Event</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrganizerEventDashboard;
