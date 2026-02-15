import KnowledgeNav from '../components/KnowledgeNav';

export default function KnowledgeHub() {

  return (
    <section className="container page">
      <h1>Database Knowledge Hub</h1>

      <KnowledgeNav />

      <div className="card info-banner">
        <h3>Track Overview</h3>
        <p>
          This module is designed in developer workflow style: setup decisions → schema design → query patterns →
          integration scenarios.
        </p>
      </div>

      <div className="grid hub-grid">
        <article className="card stage-card">
          <div className="stage-tag">RDBMS</div>
          <h3>MySQL Track</h3>
          <p>Schema-first design, relational constraints, CRUD + JOIN + aggregation workflows.</p>
        </article>

        <article className="card stage-card">
          <div className="stage-tag">RDBMS</div>
          <h3>PostgreSQL Track</h3>
          <p>Advanced relational modeling, stronger SQL features, indexing and optimization mindset.</p>
        </article>

        <article className="card stage-card">
          <div className="stage-tag">NoSQL</div>
          <h3>MongoDB Track</h3>
          <p>Document modeling, denormalized data patterns, logging/event-driven workloads.</p>
        </article>

        <article className="card stage-card">
          <div className="stage-tag">Architecture</div>
          <h3>When / Why / Why Not</h3>
          <p>Decision matrix for choosing MySQL vs PostgreSQL vs MongoDB by workload and team constraints.</p>
        </article>
      </div>
    </section>
  );
}
