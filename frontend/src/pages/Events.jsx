import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import EventCard from '../components/EventCard';
import { deleteEvent, getEvents, registerForEvent } from '../services/eventService';

export default function Events() {
  const { isAdmin, user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadEvents = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await getEvents();
      setEvents(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleDelete = async (id) => {
    setActionLoadingId(id);
    setError('');
    setMessage('');

    try {
      await deleteEvent(id);
      setMessage('Event deleted successfully.');
      await loadEvents();
    } catch (err) {
      setError(err.message || 'Delete failed');
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleRegister = async (id) => {
    if (!user?.id) {
      setError('Invalid user context. Please login again.');
      return;
    }

    setActionLoadingId(id);
    setError('');
    setMessage('');

    try {
      await registerForEvent(id, user.id);
      setMessage('Registered for event successfully.');
      await loadEvents();
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <section className="container page">
      <h1>Events</h1>
      {message && <p className="success-text">{message}</p>}
      {error && <p className="error-text">{error}</p>}

      {loading ? (
        <p>Loading events...</p>
      ) : events.length === 0 ? (
        <p>No events available.</p>
      ) : (
        <div className="grid event-grid">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isAdmin={isAdmin}
              loadingAction={actionLoadingId === event.id}
              onDelete={handleDelete}
              onRegister={handleRegister}
            />
          ))}
        </div>
      )}
    </section>
  );
}
