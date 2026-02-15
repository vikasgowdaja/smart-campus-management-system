import KnowledgeNav from '../components/KnowledgeNav';
import { useMemo, useState } from 'react';

export default function DatabaseOptimization() {
  const [query, setQuery] = useState('SELECT * FROM events WHERE location = "Mysuru" ORDER BY event_date DESC;');

  const suggestions = useMemo(() => {
    const text = query.toLowerCase();
    const items = [];

    if (text.includes('select *')) {
      items.push('Avoid `SELECT *`; choose only required columns to reduce payload and IO.');
    }

    if (text.includes(' where ')) {
      items.push('Ensure WHERE filter columns have indexes (especially high-frequency filters).');
    }

    if (text.includes(' order by ')) {
      items.push('Consider index support for ORDER BY columns to avoid full sort operations.');
    }

    if (text.includes(' like "%')) {
      items.push('Leading wildcard LIKE can skip normal indexes; consider full-text/trigram strategy.');
    }

    if (text.includes(' join ')) {
      items.push('Validate join key indexes on both sides to prevent expensive nested scans.');
    }

    if (!text.includes('limit')) {
      items.push('Add pagination (`LIMIT/OFFSET` or cursor-based) for list queries.');
    }

    if (!text.includes('explain')) {
      items.push('Run EXPLAIN/EXPLAIN ANALYZE before and after optimization to verify gains.');
    }

    return items;
  }, [query]);

  return (
    <section className="container page">
      <h1>ACID, Indexing, and Query Optimization</h1>
      <KnowledgeNav />

      <div className="grid db-brand-grid">
        <article className="card db-brand-card mysql-gradient">
          <div className="db-logo">MySQL</div>
          <h3>MySQL</h3>
          <p>Strong transactional integrity for relational business workflows.</p>
        </article>

        <article className="card db-brand-card postgres-gradient">
          <div className="db-logo">PostgreSQL</div>
          <h3>PostgreSQL</h3>
          <p>Advanced SQL power with robust consistency and indexing capabilities.</p>
        </article>

        <article className="card db-brand-card mongo-gradient">
          <div className="db-logo">MongoDB</div>
          <h3>MongoDB</h3>
          <p>Document model optimized for flexible schema and high write throughput.</p>
        </article>
      </div>

      <div className="card">
        <h3>ACID Properties (Developer View)</h3>
        <ul className="list">
          <li><strong>Atomicity:</strong> A transaction is all-or-nothing. Partial writes are not committed.</li>
          <li><strong>Consistency:</strong> Data remains valid against constraints before and after commit.</li>
          <li><strong>Isolation:</strong> Concurrent transactions do not leak intermediate states.</li>
          <li><strong>Durability:</strong> Once committed, data survives crashes and restarts.</li>
        </ul>
        <p className="meta-text">
          MySQL and PostgreSQL are ACID-first relational engines. MongoDB supports multi-document transactions,
          but is generally chosen for document flexibility and scale patterns.
        </p>
      </div>

      <div className="card">
        <h3>Indexing Strategy</h3>
        <ul className="list">
          <li>Create indexes on WHERE, JOIN, ORDER BY, and GROUP BY columns with highest read frequency.</li>
          <li>Use composite indexes in the same order as query filter precedence.</li>
          <li>Avoid over-indexing write-heavy tables; each index increases write cost.</li>
          <li>Measure index impact using query plans, not assumptions.</li>
        </ul>
      </div>

      <div className="grid hub-grid">
        <article className="card code-block">
          <h3>MySQL Index Examples</h3>
          <pre>{`CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_reg_event_user ON event_registrations(event_id, user_id);

EXPLAIN SELECT * FROM events WHERE event_date >= '2026-01-01';`}</pre>
        </article>

        <article className="card code-block">
          <h3>PostgreSQL Index Examples</h3>
          <pre>{`CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_events_title_trgm ON events USING gin (title gin_trgm_ops);

EXPLAIN ANALYZE SELECT * FROM events WHERE title ILIKE '%fest%';`}</pre>
        </article>

        <article className="card code-block">
          <h3>MongoDB Index Examples</h3>
          <pre>{`db.activity_logs.createIndex({ category: 1, createdAt: -1 });
db.activity_logs.createIndex({ userId: 1, action: 1 });

db.activity_logs.find({ category: 'error' }).sort({ createdAt: -1 });`}</pre>
        </article>
      </div>

      <div className="card">
        <h3>How to Make Queries Better</h3>
        <ol className="list ordered-list">
          <li>Profile slow endpoints and identify top SQL/NoSQL calls by latency.</li>
          <li>Run execution plan (`EXPLAIN`, `EXPLAIN ANALYZE`) before optimization.</li>
          <li>Reduce selected columns (avoid SELECT * on heavy tables).</li>
          <li>Add or refine indexes based on query pattern and cardinality.</li>
          <li>Limit response payload and paginate list endpoints.</li>
          <li>Batch writes when possible and avoid N+1 API query loops.</li>
          <li>Cache high-read low-change data at API or service layer.</li>
        </ol>
      </div>

      <div className="card">
        <h3>Interactive Query Optimizer Playground</h3>
        <p className="meta-text">
          Paste an SQL query and review practical optimization hints like a code-review checklist.
        </p>

        <textarea
          className="query-box"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Paste SQL query here..."
        />

        <div className="card mini-card">
          <h4>Optimizer Suggestions</h4>
          {suggestions.length === 0 ? (
            <p className="meta-text">No suggestions right now. Add a query pattern to analyze.</p>
          ) : (
            <ul className="list">
              {suggestions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
