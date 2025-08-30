import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, User, Tag, Ticket, Clock, ArrowLeft } from 'lucide-react';

const EventDetailPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/events/${id}`);
      if (response.ok) {
        const data = await response.json();
        setEvent(data);
      } else {
        setError('Event not found');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Calendar className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-4">Event Not Found</h1>
          <p className="text-gray-400 mb-6">{error}</p>
          <Link
            to="/"
            className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg transition-colors inline-flex items-center"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Image */}
      <div className="relative h-96 bg-gradient-to-br from-teal-500 to-blue-600">
        {event.image ? (
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Calendar className="h-32 w-32 text-white/30" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
        
        {/* Back Button */}
        <Link
          to="/"
          className="absolute top-6 left-6 bg-gray-800/80 hover:bg-gray-700 text-white p-3 rounded-full transition-colors backdrop-blur-sm"
        >
          <ArrowLeft className="h-6 w-6" />
        </Link>
      </div>

      {/* Event Details */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Info */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-teal-500/20 text-teal-400 px-3 py-1 rounded-full text-sm font-medium">
                  {event.category}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {event.title}
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center text-gray-300">
                  <Calendar className="h-6 w-6 mr-3 text-teal-400" />
                  <div>
                    <p className="font-medium">Date & Time</p>
                    <p className="text-gray-400">
                      {new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-300">
                  <MapPin className="h-6 w-6 mr-3 text-teal-400" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-gray-400">{event.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">About This Event</h2>
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {event.description}
                </p>
              </div>
            </div>

            {/* Organizer */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Organizer</h2>
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 flex items-center">
                <User className="h-12 w-12 text-teal-400 mr-4" />
                <div>
                  <p className="text-white font-medium">{event.organizer?.name || 'Event Organizer'}</p>
                  <p className="text-gray-400 text-sm">{event.organizer?.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Ticket Purchase Section */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 sticky top-24">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Ticket className="h-6 w-6 mr-2 text-teal-400" />
                Get Tickets
              </h3>
              
              {event.ticketTypes && event.ticketTypes.length > 0 ? (
                <div className="space-y-4">
                  {event.ticketTypes.map((ticketType, index) => (
                    <div key={index} className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-white font-medium">{ticketType.name}</h4>
                        <span className="text-teal-400 font-bold text-lg">
                          ${ticketType.price}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-3">
                        {ticketType.quantity} tickets available
                      </p>
                      <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-lg transition-colors font-medium">
                        Select Tickets
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Tickets coming soon</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;