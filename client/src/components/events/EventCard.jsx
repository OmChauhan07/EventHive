import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';

const EventCard = ({ event }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border border-gray-700">
      {/* Event Image */}
      <div className="h-48 bg-gradient-to-br from-teal-500 to-blue-600 relative overflow-hidden">
        {event.image ? (
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Calendar className="h-16 w-16 text-white/30" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Event Content */}
      <div className="p-6 space-y-4">
        {/* Date */}
        <div className="flex items-center text-teal-400 text-sm font-medium">
          <Calendar className="h-4 w-4 mr-2" />
          {formatDate(event.date)}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white line-clamp-2 hover:text-teal-400 transition-colors">
          {event.title}
        </h3>

        {/* Location */}
        <div className="flex items-center text-gray-400 text-sm">
          <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="truncate">{event.location}</span>
        </div>

        {/* Description Preview */}
        {event.description && (
          <p className="text-gray-300 text-sm line-clamp-3">
            {event.description}
          </p>
        )}

        {/* View Details Link */}
        <Link
          to={`/events/${event._id}`}
          className="inline-flex items-center justify-center w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 group"
        >
          View Details
          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default EventCard;