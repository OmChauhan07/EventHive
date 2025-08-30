import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Ticket, Calendar, MapPin, Clock } from 'lucide-react';

const MyTicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchUserTickets();
    }
  }, [user]);

  const fetchUserTickets = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/tickets/my-tickets', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setTickets(data);
      } else {
        setError('Failed to fetch your tickets');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Please Log In</h1>
          <p className="text-gray-400">You need to be logged in to view your tickets.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Ticket className="mx-auto h-16 w-16 text-teal-500 mb-4" />
          <h1 className="text-4xl font-bold text-white mb-4">My Tickets</h1>
          <p className="text-xl text-gray-400">Your upcoming events and ticket details</p>
        </div>

        {loading ? (
          <div className="space-y-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-gray-800 rounded-xl h-48 animate-pulse border border-gray-700" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <Ticket className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <p className="text-red-400 text-lg mb-4">{error}</p>
            <button
              onClick={fetchUserTickets}
              className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : tickets.length === 0 ? (
          <div className="text-center py-16">
            <Ticket className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg mb-4">No tickets found</p>
            <p className="text-gray-500 text-sm mb-6">You haven't purchased any tickets yet</p>
            <Link
              to="/"
              className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg transition-colors inline-flex items-center"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Browse Events
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {tickets.map((ticket) => (
              <div key={ticket._id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3">{ticket.event.title}</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-3 text-teal-400" />
                        <div>
                          <p className="font-medium">Date & Time</p>
                          <p className="text-sm text-gray-400">
                            {new Date(ticket.event.date).toLocaleDateString('en-US', {
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
                      
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 mr-3 text-teal-400" />
                        <div>
                          <p className="font-medium">Location</p>
                          <p className="text-sm text-gray-400">{ticket.event.location}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Ticket className="h-5 w-5 mr-3 text-teal-400" />
                        <div>
                          <p className="font-medium">Ticket Type</p>
                          <p className="text-sm text-gray-400">{ticket.ticketType}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 mr-3 text-teal-400" />
                        <div>
                          <p className="font-medium">Status</p>
                          <span className="inline-block px-2 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-full">
                            Confirmed
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:ml-6">
                    <div className="bg-gray-700 p-4 rounded-lg text-center border border-gray-600">
                      <p className="text-gray-400 text-sm mb-1">Ticket ID</p>
                      <p className="text-white font-mono text-sm">{ticket._id.slice(-8).toUpperCase()}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTicketsPage;