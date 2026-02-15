import api from '../api/axios';

const extractError = (error, fallback) => {
  return error?.response?.data?.message || fallback;
};

export const getEvents = async () => {
  try {
    const { data } = await api.get('/events');
    return data;
  } catch (error) {
    throw new Error(extractError(error, 'Failed to load events'));
  }
};

export const createEvent = async (payload) => {
  try {
    const { data } = await api.post('/events', payload);
    return data;
  } catch (error) {
    throw new Error(extractError(error, 'Failed to create event'));
  }
};

export const updateEvent = async (id, payload) => {
  try {
    const { data } = await api.put(`/events/${id}`, payload);
    return data;
  } catch (error) {
    throw new Error(extractError(error, 'Failed to update event'));
  }
};

export const deleteEvent = async (id) => {
  try {
    const { data } = await api.delete(`/events/${id}`);
    return data;
  } catch (error) {
    throw new Error(extractError(error, 'Failed to delete event'));
  }
};

export const registerForEvent = async (eventId, userId) => {
  try {
    const { data } = await api.post(`/events/${eventId}/register`);
    return data;
  } catch (error) {
    if (error?.response?.status === 404) {
      try {
        const { data } = await api.post('/registrations', {
          event_id: Number(eventId),
          user_id: Number(userId),
          status: 'registered'
        });
        return data;
      } catch (fallbackError) {
        throw new Error(extractError(fallbackError, 'Failed to register for event'));
      }
    }
    throw new Error(extractError(error, 'Failed to register for event'));
  }
};
