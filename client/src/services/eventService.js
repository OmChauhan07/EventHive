const API_URL = 'http://localhost:5000/api/events';

export const getAllEvents = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }
  return response.json();
};

export const createEvent = async (eventData, token) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(eventData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.msg || 'Failed to create event');
  }
  return response.json();
};
