import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faMapMarkerAlt, faUsers, faCloud, faTrash, faUserPlus } from '@fortawesome/free-solid-svg-icons';

export default function EventCard({ event, isAdmin, onDelete, onRegister, loadingAction }) {
  const weather = event?.weather_snapshot ? parseWeather(event.weather_snapshot) : null;

  return (
    <article className="card event-card">
      <h3>{event.title}</h3>
      <p>{event.description || 'No description provided.'}</p>
      <p>
        <FontAwesomeIcon icon={faCalendar} className="icon-inline" />
        <strong>Date:</strong> {new Date(event.event_date).toLocaleString()}
      </p>
      <p>
        <FontAwesomeIcon icon={faMapMarkerAlt} className="icon-inline" />
        <strong>Location:</strong> {event.location}
      </p>
      <p>
        <FontAwesomeIcon icon={faUsers} className="icon-inline" />
        <strong>Registrations:</strong> {event.total_registrations ?? 0}
      </p>

      <div className="weather-box">
        <strong><FontAwesomeIcon icon={faCloud} className="icon-inline" />Weather Snapshot:</strong>
        {weather ? (
          <div>
            <div>{weather.forecast?.weather || 'N/A'}</div>
            <div>Temp: {weather.forecast?.temp_c ?? 'N/A'} °C</div>
            <div>Humidity: {weather.forecast?.humidity ?? 'N/A'}%</div>
          </div>
        ) : (
          <div>Unavailable</div>
        )}
      </div>

      <div className="card-actions">
        {isAdmin ? (
          <button
            type="button"
            className="btn btn-danger"
            disabled={loadingAction}
            onClick={() => onDelete(event.id)}
          >
            <FontAwesomeIcon icon={faTrash} className="icon-inline" />
            {loadingAction ? 'Deleting...' : 'Delete'}
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-primary"
            disabled={loadingAction}
            onClick={() => onRegister(event.id)}
          >
            <FontAwesomeIcon icon={faUserPlus} className="icon-inline" />
            {loadingAction ? 'Registering...' : 'Register'}
          </button>
        )}
      </div>
    </article>
  );
}

function parseWeather(rawWeather) {
  try {
    return typeof rawWeather === 'string' ? JSON.parse(rawWeather) : rawWeather;
  } catch {
    return null;
  }
}
