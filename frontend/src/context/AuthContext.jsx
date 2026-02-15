import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/authService';
import { setAuthFailureHandler } from '../api/axios';

const AuthContext = createContext(null);

const parseUserFromToken = (token) => {
  try {
    const payloadBase64 = token.split('.')[1];
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);

    return {
      id: payload.id,
      email: payload.email,
      role: payload.role
    };
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(token ? parseUserFromToken(token) : null);
  const [loading, setLoading] = useState(false);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  useEffect(() => {
    setAuthFailureHandler(logout);
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const data = await loginUser(credentials);
      const newToken = data.token;

      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(parseUserFromToken(newToken));

      return data;
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    setLoading(true);
    try {
      const data = await registerUser(payload);
      if (data?.token) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setUser(parseUserFromToken(data.token));
      }
      return data;
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(token),
      isAdmin: user?.role === 'admin' || user?.role === 'Admin',
      login,
      register,
      logout
    }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
