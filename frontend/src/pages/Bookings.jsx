import { useEffect, useState } from 'react';
import { createBooking, getBookingsByUser, getResources } from '../services/bookingService';
import { useAuth } from '../context/AuthContext';

export default function Bookings() {
  const { user } = useAuth();
  const [resources, setResources] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({ resourceId: '', startTime: '', endTime: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadData = async () => {
    if (!user?.id) {
      return;
    }

    try {
      const [resourceData, bookingData] = await Promise.all([getResources(), getBookingsByUser(user.id)]);
      setResources(Array.isArray(resourceData) ? resourceData : []);
      setBookings(Array.isArray(bookingData) ? bookingData : []);
    } catch (err) {
      setError(err.message || 'Failed to load booking data');
    }
  };

  useEffect(() => {
    loadData();
  }, [user?.id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await createBooking({
        userId: user.id,
        resourceId: Number(form.resourceId),
        startTime: form.startTime,
        endTime: form.endTime
      });

      setSuccess('Booking created successfully.');
      setForm({ resourceId: '', startTime: '', endTime: '' });
      await loadData();
    } catch (err) {
      setError(err.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container page">
      <h1>Resource Bookings</h1>
      {error && <p className="error-text">{error}</p>}
      {success && <p className="success-text">{success}</p>}

      <form className="card form-card" onSubmit={handleSubmit}>
        <h3>Book a Resource</h3>

        <label>Resource</label>
        <select
          value={form.resourceId}
          onChange={(e) => setForm((prev) => ({ ...prev, resourceId: e.target.value }))}
          required
        >
          <option value="">Select resource</option>
          {resources.map((resource) => (
            <option key={resource.id} value={resource.id}>
              {resource.name}
            </option>
          ))}
        </select>

        <label>Start Time</label>
        <input
          type="datetime-local"
          value={form.startTime}
          onChange={(e) => setForm((prev) => ({ ...prev, startTime: e.target.value }))}
          required
        />

        <label>End Time</label>
        <input
          type="datetime-local"
          value={form.endTime}
          onChange={(e) => setForm((prev) => ({ ...prev, endTime: e.target.value }))}
          required
        />

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Submitting...' : 'Create Booking'}
        </button>
      </form>

      <div className="card">
        <h3>Your Bookings</h3>
        {bookings.length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
          <ul className="list">
            {bookings.map((booking) => (
              <li key={booking.id || `${booking.resourceId}-${booking.startTime}`}>
                Resource #{booking.resourceId} | {booking.startTime} → {booking.endTime}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
