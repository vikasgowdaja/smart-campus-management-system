import api from '../api/axios';

const extractError = (error, fallback) => {
  return error?.response?.data?.message || fallback;
};

export const registerUser = async (payload) => {
  try {
    const { data } = await api.post('/auth/register', payload);
    return data;
  } catch (error) {
    if (error?.response?.status === 404) {
      const { data } = await api.post('/users/register', payload);
      return data;
    }
    throw new Error(extractError(error, 'Registration failed'));
  }
};

export const loginUser = async (payload) => {
  try {
    const { data } = await api.post('/auth/login', payload);
    return data;
  } catch (error) {
    if (error?.response?.status === 404) {
      const { data } = await api.post('/users/login', payload);
      return data;
    }
    throw new Error(extractError(error, 'Login failed'));
  }
};
