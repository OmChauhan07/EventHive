import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Plus, Minus, Calendar, MapPin, Tag, DollarSign, Ticket } from 'lucide-react';

const CreateEventPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    category: '',
    image: '',
  });
  
  const [ticketTypes, setTicketTypes] = useState([
    { name: 'General Admission', price: '', quantity: '', saleStartDate: '', saleEndDate: '' }
  ]);
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();

  const categories = [
    'Workshop',
    'Concert',
    'Sports',
    'Hackathon',
    'Community',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleTicketChange = (index, field, value) => {
    const updatedTickets = [...ticketTypes];
    updatedTickets[index][field] = value;
    setTicketTypes(updatedTickets);
  };

  const addTicketType = () => {
    setTicketTypes([...ticketTypes, { name: '', price: '', quantity: '', saleStartDate: '', saleEndDate: '' }]);
  };

  const removeTicketType = (index) => {
    if (ticketTypes.length > 1) {
      setTicketTypes(ticketTypes.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const token = localStorage.getItem('token');
      const eventData = {
        ...formData,
        ticketTypes: ticketTypes.map(ticket => ({
          ...ticket,
          price: parseFloat(ticket.price) || 0,
          quantity: parseInt(ticket.quantity) || 0,
          saleStartDate: ticket.saleStartDate,
          saleEndDate: ticket.saleEndDate,
        })),
      };

      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(eventData),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/organizer/dashboard');
      } else {
        setErrors({ general: data.message || 'Failed to create event' });
      }
    } catch (error) {
      setErrors({ general: 'Network error. Please try again.' });
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
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Calendar className="mx-auto h-16 w-16 text-teal-500 mb-4" />
          <h1 className="text-4xl font-bold text-white mb-4">Create New Event</h1>
          <p className="text-xl text-gray-400">Bring your vision to life and connect with your audience</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
            {/* Basic Information */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Tag className="h-6 w-6 mr-2 text-teal-400" />
                Event Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div className="md:col-span-2">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                    Event Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    placeholder="Enter event title"
                  />
                </div>

                {/* Date */}
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-2">
                    Date & Time
                  </label>
                  <div className="relative">
                    <Calendar className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="datetime-local"
                      id="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      id="location"
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      placeholder="Enter event location"
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Image URL */}
                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-2">
                    Event Image URL (Optional)
                  </label>
                  <input
                    type="url"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    placeholder="https://example.com/event-image.jpg"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                    Event Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
                    placeholder="Describe your event in detail..."
                  />
                </div>
              </div>
            </div>

            {/* Ticket Types */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Ticket className="h-6 w-6 mr-2 text-teal-400" />
                Ticket Types
              </h2>
              
              <div className="space-y-4">
                {ticketTypes.map((ticket, index) => (
                  <div key={index} className="bg-gray-700 p-6 rounded-lg border border-gray-600">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-white">
                        Ticket Type {index + 1}
                      </h3>
                      {ticketTypes.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTicketType(index)}
                          className="text-red-400 hover:text-red-300 p-2 rounded-full hover:bg-red-500/10 transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Sale Start Date
                        </label>
                        <input
                          type="datetime-local"
                          required
                          value={ticket.saleStartDate}
                          onChange={(e) => handleTicketChange(index, 'saleStartDate', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Sale End Date
                        </label>
                        <input
                          type="datetime-local"
                          required
                          value={ticket.saleEndDate}
                          onChange={(e) => handleTicketChange(index, 'saleEndDate', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Ticket Name
                        </label>
                        <input
                          type="text"
                          required
                          value={ticket.name}
                          onChange={(e) => handleTicketChange(index, 'name', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                          placeholder="e.g., VIP, General"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Price ($)
                        </label>
                        <div className="relative">
                          <DollarSign className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                          <input
                            type="number"
                            required
                            min="0"
                            step="0.01"
                            value={ticket.price}
                            onChange={(e) => handleTicketChange(index, 'price', e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                            placeholder="0.00"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Quantity
                        </label>
                        <input
                          type="number"
                          required
                          min="1"
                          value={ticket.quantity}
                          onChange={(e) => handleTicketChange(index, 'quantity', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                          placeholder="Available tickets"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={addTicketType}
                  className="w-full bg-gray-700 hover:bg-gray-600 border-2 border-dashed border-gray-600 hover:border-teal-500 text-gray-300 hover:text-teal-400 py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center group"
                >
                  <Plus className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                  Add Another Ticket Type
                </button>
              </div>
            </div>

            {/* Error Message */}
            {errors.general && (
              <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <p className="text-red-400 text-sm">{errors.general}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/organizer/dashboard')}
                className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-teal-500 hover:bg-teal-600 disabled:bg-teal-500/50 text-white font-medium py-3 px-8 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-800 flex items-center"
              >
                {loading ? 'Creating...' : 'Create Event'}
                <Calendar className="h-5 w-5 ml-2" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventPage;