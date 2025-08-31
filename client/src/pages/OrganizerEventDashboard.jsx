import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEvents } from '../contexts/EventContext';
import EventCard from '../components/events/EventCard';

const OrganizerEventDashboard = () => {
  const [filteredEvents, setFilteredEvents] = useState([]);
  const { user, loading: authLoading } = useAuth();
  const { events, loading, error } = useEvents();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'Organizer')) {
      navigate('/');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user && user.role === 'Organizer' && events.length > 0) {
      // Filter events created by this organizer
      const myEvents = events.filter(event => event.organizer === user.id);
      setFilteredEvents(myEvents);
    }
  }, [user, events]);

  if (authLoading || loading) return <div className="text-center text-white mt-10">Loading your events...</div>;
  if (error) return <div className="text-center text-red-400 mt-10">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-white mb-8">My Created Events</h1>
      {filteredEvents.length === 0 ? (
        <div className="text-gray-400">You haven't created any events yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map(event => (
            <div key={event._id} className="relative">
              <EventCard event={event} />
              <Link 
                to={`/organizer/edit-event/${event._id}`} 
                className="absolute bottom-4 left-4 right-4 bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 text-center z-10"
              >
                Edit Event
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrganizerEventDashboard;
