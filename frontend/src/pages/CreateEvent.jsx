import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../services/eventService';
import { useAuth } from '../context/AuthContext';

export default function CreateEvent() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState({
    title: '',
    description: '',
    event_date: '',
    location: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await createEvent({
        ...form,
        created_by: user?.id
      });
      setSuccess('Event created successfully.');
      setTimeout(() => navigate('/events'), 800);
    } catch (err) {
      setError(err.message || 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container page">
      <h1>Create Event</h1>
      <form className="card form-card" onSubmit={handleSubmit}>
        {success && <p className="success-text">{success}</p>}
        {error && <p className="error-text">{error}</p>}

        <label>Title</label>
        <input
          value={form.title}
          onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
          required
        />

        <label>Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
        />

        <label>Event Date & Time</label>
        <input
          type="datetime-local"
          value={form.event_date}
          onChange={(e) => setForm((prev) => ({ ...prev, event_date: e.target.value }))}
          required
        />

        <label>Location</label>
        <input
          value={form.location}
          onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
          required
        />

        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Event'}
        </button>
      </form>
    </section>
  );
}
