import KnowledgeNav from '../components/KnowledgeNav';

export default function DatabasePostgreSQL() {
  return (
    <section className="container page">
      <h1>PostgreSQL – Detailed Developer Guide</h1>
      <KnowledgeNav />

      <div className="card">
        <h3>When to Use PostgreSQL</h3>
        <ul className="list">
          <li>Complex analytical queries and advanced SQL feature usage.</li>
          <li>Strong consistency with robust indexing and extension ecosystem.</li>
          <li>Projects needing JSONB + relational hybrid patterns.</li>
        </ul>
      </div>

      <div className="card">
        <h3>Setup Process</h3>
        <ol className="list ordered-list">
          <li>Install PostgreSQL Server.</li>
          <li>Use pgAdmin for administration and visual database operations.</li>
          <li>Use psql shell for scripting, migration, and automation.</li>
        </ol>
        <p>
          Download links:{' '}
          <a href="https://www.postgresql.org/download/" target="_blank" rel="noreferrer">Server</a> |{' '}
          <a href="https://www.pgadmin.org/download/" target="_blank" rel="noreferrer">pgAdmin</a> |{' '}
          <a href="https://www.postgresql.org/docs/current/app-psql.html" target="_blank" rel="noreferrer">psql Shell</a>
        </p>
      </div>

      <div className="card code-block">
        <h3>Core Queries</h3>
        <pre>{`-- CTE + Aggregation example
WITH registrations_per_event AS (
  SELECT event_id, COUNT(*) AS total
  FROM event_registrations
  GROUP BY event_id
)
SELECT e.title, COALESCE(r.total, 0) AS registrations
FROM events e
LEFT JOIN registrations_per_event r ON r.event_id = e.id;

-- JSONB capability
ALTER TABLE events ADD COLUMN metadata JSONB;
UPDATE events SET metadata = '{"category":"fest","level":"campus"}'::jsonb WHERE id = 1;

-- Indexing
CREATE INDEX idx_events_date ON events(event_date);`}</pre>
      </div>
    </section>
  );
}
