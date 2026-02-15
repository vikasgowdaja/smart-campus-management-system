import KnowledgeNav from '../components/KnowledgeNav';

export default function DatabaseScenarios() {
  return (
    <section className="container page">
      <h1>When / Why / Why Not – Database Selection</h1>
      <KnowledgeNav />

      <div className="card">
        <h3>MySQL</h3>
        <ul className="list">
          <li><strong>When:</strong> transactional applications with predictable schema.</li>
          <li><strong>Why:</strong> simple operations, strong relational support, broad ecosystem.</li>
          <li><strong>Why not:</strong> very complex analytical SQL and advanced extension-heavy workloads.</li>
        </ul>
      </div>

      <div className="card">
        <h3>PostgreSQL</h3>
        <ul className="list">
          <li><strong>When:</strong> advanced SQL requirements and mixed relational + JSON workloads.</li>
          <li><strong>Why:</strong> strong standards compliance, rich query planner, extension support.</li>
          <li><strong>Why not:</strong> teams needing very simple baseline setup with low SQL complexity.</li>
        </ul>
      </div>

      <div className="card">
        <h3>MongoDB</h3>
        <ul className="list">
          <li><strong>When:</strong> semi-structured data, logs, and evolving schema products.</li>
          <li><strong>Why:</strong> high write throughput, flexible documents, horizontal scaling.</li>
          <li><strong>Why not:</strong> strict relational integrity and multi-table transaction heavy domains.</li>
        </ul>
      </div>

      <div className="card">
        <h3>Recommended Pattern for Smart Campus</h3>
        <ul className="list">
          <li>MySQL: users, events, registrations, bookings (source of truth).</li>
          <li>MongoDB: activity logs, diagnostics, operational telemetry.</li>
          <li>Optional PostgreSQL track: advanced analytics or reporting expansion.</li>
        </ul>
      </div>
    </section>
  );
}
