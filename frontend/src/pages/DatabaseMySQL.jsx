import KnowledgeNav from '../components/KnowledgeNav';

export default function DatabaseMySQL() {
  return (
    <section className="container page">
      <h1>MySQL – Detailed Developer Guide</h1>
      <KnowledgeNav />

      <div className="card">
        <h3>When to Use MySQL</h3>
        <ul className="list">
          <li>Well-structured transactional systems with clear relationships.</li>
          <li>Systems requiring referential integrity and predictable schema evolution.</li>
          <li>Backend APIs with heavy CRUD + JOIN patterns.</li>
        </ul>
      </div>

      <div className="card">
        <h3>Setup Process</h3>
        <ol className="list ordered-list">
          <li>Install MySQL Server.</li>
          <li>Install MySQL Workbench for visual schema and SQL operations.</li>
          <li>Install MySQL Shell/CLI for scripting and automation tasks.</li>
          <li>Create database and run schema migration SQL.</li>
        </ol>
        <p>
          Download links: <a href="https://dev.mysql.com/downloads/mysql/" target="_blank" rel="noreferrer">Server</a>{' '}
          | <a href="https://dev.mysql.com/downloads/workbench/" target="_blank" rel="noreferrer">Workbench</a> |{' '}
          <a href="https://dev.mysql.com/downloads/shell/" target="_blank" rel="noreferrer">Shell</a>
        </p>
      </div>

      <div className="card">
        <h3>Relationship Model Example</h3>
        <ul className="list">
          <li>`users (1) → events (many)` via `events.created_by`</li>
          <li>`events (1) → event_registrations (many)` via `event_id`</li>
          <li>`users (1) → event_registrations (many)` via `user_id`</li>
        </ul>
      </div>

      <div className="card code-block">
        <h3>Core Queries</h3>
        <pre>{`-- Create
INSERT INTO users(name, email, password, role) VALUES ('Alice', 'alice@campus.edu', 'hash', 'student');

-- Read + Join
SELECT e.id, e.title, u.name AS created_by_name
FROM events e
JOIN users u ON u.id = e.created_by;

-- Aggregation
SELECT e.title, COUNT(er.id) AS registrations
FROM events e
LEFT JOIN event_registrations er ON er.event_id = e.id
GROUP BY e.id, e.title;

-- Update
UPDATE events SET location = 'Lab 3' WHERE id = 1;

-- Delete
DELETE FROM event_registrations WHERE id = 10;`}</pre>
      </div>
    </section>
  );
}
