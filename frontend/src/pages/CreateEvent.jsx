import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faMapMarkerAlt, faFileAlt, faHeading, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
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
        {success && <p className="success-text"><FontAwesomeIcon icon={faCheckCircle} className="icon-inline" /> {success}</p>}
        {error && <p className="error-text"><FontAwesomeIcon icon={faExclamationCircle} className="icon-inline" /> {error}</p>}

        <label><FontAwesomeIcon icon={faHeading} className="icon-inline" /> Title</label>
        <input
          value={form.title}
          onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
          required
        />

        <label><FontAwesomeIcon icon={faFileAlt} className="icon-inline" /> Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
        />

        <label><FontAwesomeIcon icon={faCalendar} className="icon-inline" /> Event Date & Time</label>
        <input
          type="datetime-local"
          value={form.event_date}
          onChange={(e) => setForm((prev) => ({ ...prev, event_date: e.target.value }))}
          required
        />

        <label><FontAwesomeIcon icon={faMapMarkerAlt} className="icon-inline" /> Location</label>
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
