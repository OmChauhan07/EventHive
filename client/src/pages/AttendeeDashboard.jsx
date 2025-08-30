import React, { useEffect, useState } from 'react';
import { getAllEvents } from '../services/eventService';
import { Link } from 'react-router-dom';

const AttendeeDashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getAllEvents();
        setEvents(data.events || data || []);
      } catch (err) {
        setError('Failed to load events.');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) return <div className="text-center text-white mt-10">Loading events...</div>;
  if (error) return <div className="text-center text-red-400 mt-10">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-white mb-8">Available Events</h1>
      {events.length === 0 ? (
        <div className="text-gray-400">No events available.</div>
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
              <Link to={`/events/${event._id}`} className="mt-2 inline-block bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-center">View Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AttendeeDashboard;
