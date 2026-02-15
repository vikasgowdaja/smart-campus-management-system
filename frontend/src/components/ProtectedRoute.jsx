import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ roles = [] }) {
  const { isAuthenticated, user } = useAuth();

  // Block unauthenticated users.
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Enforce optional role restrictions.
  if (roles.length > 0 && !roles.includes(user?.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
