import api from '../api/axios';

const extractError = (error, fallback) => {
  return error?.response?.data?.message || fallback;
};

const LOCAL_BOOKING_KEY = 'smart_campus_local_bookings';

const readLocalBookings = () => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_BOOKING_KEY) || '[]');
  } catch {
    return [];
  }
};

const writeLocalBookings = (bookings) => {
  localStorage.setItem(LOCAL_BOOKING_KEY, JSON.stringify(bookings));
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
    if (error?.response?.status === 404) {
      const existing = readLocalBookings();
      const newBooking = {
        id: Date.now(),
        userId: Number(payload.userId),
        resourceId: Number(payload.resourceId),
        startTime: payload.startTime,
        endTime: payload.endTime
      };
      writeLocalBookings([...existing, newBooking]);
      return newBooking;
    }
    throw new Error(extractError(error, 'Failed to create booking'));
  }
};

export const getBookingsByUser = async (userId) => {
  try {
    const { data } = await api.get(`/bookings/user/${userId}`);
    return data;
  } catch (error) {
    if (error?.response?.status === 404) {
      try {
        const { data } = await api.get('/registrations');
        if (Array.isArray(data)) {
          return data
            .filter((item) => Number(item.user_id) === Number(userId))
            .map((item) => ({
              id: item.id,
              resourceId: item.event_id,
              resourceName: item.event_title,
              startTime: item.registered_at,
              endTime: item.registered_at,
              status: item.status
            }));
        }
      } catch {
        return readLocalBookings().filter((item) => Number(item.userId) === Number(userId));
      }

      return readLocalBookings().filter((item) => Number(item.userId) === Number(userId));
    }
    throw new Error(extractError(error, 'Failed to load bookings'));
  }
};
