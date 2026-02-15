import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated, isAdmin, logout, user } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/dashboard" className="brand">
          Smart Campus
        </Link>

        <nav className="nav-links">
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/events">Events</NavLink>
          {!isAdmin && <NavLink to="/resources">Resources</NavLink>}
          {!isAdmin && <NavLink to="/bookings">Bookings</NavLink>}
          {isAdmin && <NavLink to="/events/create">Create Event</NavLink>}
        </nav>

        <div className="nav-user">
          <span>{user?.email}</span>
          <button type="button" className="btn btn-outline" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
