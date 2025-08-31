import React from 'react';
import { Link } from 'react-router-dom';
import EventCard from '../components/events/EventCard';
import { useEvents } from '../contexts/EventContext';

const AttendeeDashboard = () => {
  const { events, loading, error } = useEvents();

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
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AttendeeDashboard;
