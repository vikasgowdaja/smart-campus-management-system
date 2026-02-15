import api from '../api/axios';

const extractError = (error, fallback) => {
  return error?.response?.data?.message || fallback;
};

export const getResources = async () => {
  try {
    const { data } = await api.get('/resources');
    return data;
  } catch (error) {
    if (error?.response?.status === 404) {
      return [
        { id: 1, name: 'Lab 2', type: 'Room' },
        { id: 2, name: 'Auditorium A', type: 'Hall' },
        { id: 3, name: 'Projector Unit', type: 'Equipment' }
      ];
    }
    throw new Error(extractError(error, 'Failed to load resources'));
  }
};

export const createBooking = async (payload) => {
  try {
    const { data } = await api.post('/bookings', payload);
    return data;
  } catch (error) {
    throw new Error(extractError(error, 'Failed to create booking'));
  }
};

export const getBookingsByUser = async (userId) => {
  try {
    const { data } = await api.get(`/bookings/user/${userId}`);
    return data;
  } catch (error) {
    throw new Error(extractError(error, 'Failed to load bookings'));
  }
};
