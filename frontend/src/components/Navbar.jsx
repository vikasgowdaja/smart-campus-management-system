import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faStar, 
  faChartLine, 
  faBell, 
  faBook, 
  faBox, 
  faCalendar, 
  faPlus, 
  faUser,
  faSignOutAlt 
} from '@fortawesome/free-solid-svg-icons';
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
          <FontAwesomeIcon icon={faStar} className="nav-icon" />
          Smart Campus
        </Link>

        <nav className="nav-links">
          <NavLink to="/dashboard">
            <FontAwesomeIcon icon={faChartLine} className="nav-icon" />
            Dashboard
          </NavLink>
          <NavLink to="/events">
            <FontAwesomeIcon icon={faBell} className="nav-icon" />
            Events
          </NavLink>
          <NavLink to="/knowledge-hub">
            <FontAwesomeIcon icon={faBook} className="nav-icon" />
            Knowledge Hub
          </NavLink>
          {!isAdmin && (
            <NavLink to="/resources">
              <FontAwesomeIcon icon={faBox} className="nav-icon" />
              Resources
            </NavLink>
          )}
          {!isAdmin && (
            <NavLink to="/bookings">
              <FontAwesomeIcon icon={faCalendar} className="nav-icon" />
              Bookings
            </NavLink>
          )}
          {isAdmin && (
            <NavLink to="/events/create">
              <FontAwesomeIcon icon={faPlus} className="nav-icon" />
              Create Event
            </NavLink>
          )}
        </nav>

        <div className="nav-user">
          <span>
            <FontAwesomeIcon icon={faUser} className="nav-icon" />
            {user?.email}
          </span>
          <button type="button" className="btn btn-outline" onClick={logout}>
            <FontAwesomeIcon icon={faSignOutAlt} className="nav-icon" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
