import React, { useState, useEffect } from 'react';
import { ArrowDown, Sparkles, Users, Calendar } from 'lucide-react';
import EventCard from '../components/events/EventCard';

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/events');
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      } else {
        setError('Failed to fetch events');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const scrollToEvents = () => {
    document.getElementById('events-section')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-teal-900/30">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-blue-500/10 animate-pulse" />
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-teal-500/20 rounded-full blur-xl animate-bounce delay-1000" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-bounce delay-500" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-500/20 rounded-full blur-xl animate-bounce delay-700" />

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in">
            <Sparkles className="h-16 w-16 text-teal-400 mx-auto mb-6 animate-pulse" />
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Where Events
              <span className="block bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
                Come Alive
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover extraordinary experiences, connect with amazing people, and create unforgettable memories
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button
                onClick={scrollToEvents}
                className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-teal-500/25 flex items-center group"
              >
                Explore Events
                <ArrowDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
              </button>
              
              <div className="flex items-center space-x-6 text-gray-400">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-teal-400" />
                  <span className="text-sm">10k+ Members</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-teal-400" />
                  <span className="text-sm">500+ Events</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6 text-gray-400" />
        </div>
      </section>

      {/* Events Section */}
      <section id="events-section" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Upcoming Events
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Don't miss out on these amazing experiences happening near you
            </p>
          </div>

          {/* Events Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-gray-800 rounded-xl h-96 animate-pulse border border-gray-700">
                  <div className="h-48 bg-gray-700 rounded-t-xl" />
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-gray-700 rounded w-1/2" />
                    <div className="h-6 bg-gray-700 rounded w-3/4" />
                    <div className="h-4 bg-gray-700 rounded w-1/3" />
                    <div className="h-10 bg-gray-700 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <Calendar className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <p className="text-red-400 text-lg mb-4">{error}</p>
              <button
                onClick={fetchEvents}
                className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-16">
              <Calendar className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No events available at the moment</p>
              <p className="text-gray-500 text-sm mt-2">Check back soon for exciting new events!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;