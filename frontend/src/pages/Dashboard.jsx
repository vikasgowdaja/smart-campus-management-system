import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getEvents } from '../services/eventService';
import { getBookingsByUser } from '../services/bookingService';

export default function Dashboard() {
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = useState({ events: 0, bookings: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      setError('');

      try {
        const events = await getEvents();
        let bookingCount = 0;

        if (!isAdmin && user?.id) {
          const bookings = await getBookingsByUser(user.id);
          bookingCount = Array.isArray(bookings) ? bookings.length : 0;
        }

        setStats({
          events: Array.isArray(events) ? events.length : 0,
          bookings: bookingCount
        });
      } catch (err) {
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [user?.id, isAdmin]);

  return (
    <section className="container page">
      <h1>Dashboard</h1>
      {error && <p className="error-text">{error}</p>}
      {loading ? (
        <p>Loading dashboard...</p>
      ) : (
        <div className="grid summary-grid">
          <div className="card summary-card">
            <h3>Total Events</h3>
            <p>{stats.events}</p>
          </div>
          {!isAdmin && (
            <div className="card summary-card">
              <h3>Your Bookings</h3>
              <p>{stats.bookings}</p>
            </div>
          )}
          <div className="card summary-card">
            <h3>Role</h3>
            <p>{user?.role || 'Unknown'}</p>
          </div>
        </div>
      )}
    </section>
  );
}
