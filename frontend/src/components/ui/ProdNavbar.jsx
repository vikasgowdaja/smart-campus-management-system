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
  faSignOutAlt,
  faBars,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function ProdNavbar() {
  const { isAuthenticated, isAdmin, logout, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <header className="prod-navbar">
      <div className="navbar-container">
        {/* Brand */}
        <Link to="/dashboard" className="navbar-brand">
          <FontAwesomeIcon icon={faStar} className="brand-icon" />
          <span className="brand-text">Smart Campus</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="navbar-nav desktop-nav">
          <NavLink to="/dashboard" className="nav-link">
            <FontAwesomeIcon icon={faChartLine} className="nav-icon" />
            Dashboard
          </NavLink>
          <NavLink to="/events" className="nav-link">
            <FontAwesomeIcon icon={faBell} className="nav-icon" />
            Events
          </NavLink>
          <NavLink to="/knowledge-hub" className="nav-link">
            <FontAwesomeIcon icon={faBook} className="nav-icon" />
            Knowledge
          </NavLink>
          {!isAdmin && (
            <>
              <NavLink to="/resources" className="nav-link">
                <FontAwesomeIcon icon={faBox} className="nav-icon" />
                Resources
              </NavLink>
              <NavLink to="/bookings" className="nav-link">
                <FontAwesomeIcon icon={faCalendar} className="nav-icon" />
                Bookings
              </NavLink>
            </>
          )}
          {isAdmin && (
            <NavLink to="/events/create" className="nav-link">
              <FontAwesomeIcon icon={faPlus} className="nav-icon" />
              Create Event
            </NavLink>
          )}
        </nav>

        {/* User Section */}
        <div className="navbar-user">
          <div className="user-info">
            <FontAwesomeIcon icon={faUser} className="user-icon" />
            <span className="user-email">{user?.email}</span>
          </div>
          <button
            onClick={logout}
            className="btn-logout"
            aria-label="Logout"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" />
            <span className="logout-text">Logout</span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="navbar-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} />
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="navbar-mobile">
          <NavLink
            to="/dashboard"
            className="mobile-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            <FontAwesomeIcon icon={faChartLine} />
            Dashboard
          </NavLink>
          <NavLink
            to="/events"
            className="mobile-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            <FontAwesomeIcon icon={faBell} />
            Events
          </NavLink>
          <NavLink
            to="/knowledge-hub"
            className="mobile-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            <FontAwesomeIcon icon={faBook} />
            Knowledge
          </NavLink>
          {!isAdmin && (
            <>
              <NavLink
                to="/resources"
                className="mobile-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FontAwesomeIcon icon={faBox} />
                Resources
              </NavLink>
              <NavLink
                to="/bookings"
                className="mobile-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FontAwesomeIcon icon={faCalendar} />
                Bookings
              </NavLink>
            </>
          )}
          {isAdmin && (
            <NavLink
              to="/events/create"
              className="mobile-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FontAwesomeIcon icon={faPlus} />
              Create Event
            </NavLink>
          )}
        </nav>
      )}
    </header>
  );
}
