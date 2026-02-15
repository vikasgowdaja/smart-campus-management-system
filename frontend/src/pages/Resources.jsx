import { useEffect, useState } from 'react';
import { getResources } from '../services/bookingService';

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadResources = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await getResources();
        setResources(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || 'Failed to load resources');
      } finally {
        setLoading(false);
      }
    };

    loadResources();
  }, []);

  return (
    <section className="container page">
      <h1>Resources</h1>
      {error && <p className="error-text">{error}</p>}
      {loading ? (
        <p>Loading resources...</p>
      ) : (
        <div className="grid resource-grid">
          {resources.map((resource) => (
            <div className="card" key={resource.id}>
              <h3>{resource.name}</h3>
              <p>Type: {resource.type || 'General'}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
