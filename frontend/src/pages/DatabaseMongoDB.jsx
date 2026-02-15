import KnowledgeNav from '../components/KnowledgeNav';

export default function DatabaseMongoDB() {
  return (
    <section className="container page">
      <h1>MongoDB – Detailed Developer Guide</h1>
      <KnowledgeNav />

      <div className="card">
        <h3>When to Use MongoDB</h3>
        <ul className="list">
          <li>Event logs, telemetry, and fast-changing schema data.</li>
          <li>High write throughput and document-centric APIs.</li>
          <li>Use-cases where denormalization improves read speed.</li>
        </ul>
      </div>

      <div className="card">
        <h3>Setup Process</h3>
        <ol className="list ordered-list">
          <li>Install MongoDB Community Server.</li>
          <li>Install MongoDB Compass for visual exploration.</li>
          <li>Use mongosh for shell scripting and ops automation.</li>
        </ol>
        <p>
          Download links:{' '}
          <a href="https://www.mongodb.com/try/download/community" target="_blank" rel="noreferrer">Server</a> |{' '}
          <a href="https://www.mongodb.com/try/download/compass" target="_blank" rel="noreferrer">Compass</a> |{' '}
          <a href="https://www.mongodb.com/docs/mongodb-shell/" target="_blank" rel="noreferrer">mongosh</a>
        </p>
      </div>

      <div className="card">
        <h3>Relationship Strategy</h3>
        <ul className="list">
          <li>Embed when child objects are tightly coupled and read together.</li>
          <li>Reference when document growth is high or reuse is required.</li>
          <li>For this project, logs use separate `activity_logs` collection.</li>
        </ul>
      </div>

      <div className="card code-block">
        <h3>Core Queries</h3>
        <pre>{`// Insert log
db.activity_logs.insertOne({
  category: 'auth',
  action: 'login_attempt',
  status: 'success',
  userId: 3,
  createdAt: new Date()
});

// Filter recent failures
db.activity_logs.find({ category: 'error', status: 'failed' }).sort({ createdAt: -1 }).limit(20);

// Aggregation
db.activity_logs.aggregate([
  { $match: { category: 'auth' } },
  { $group: { _id: '$status', count: { $sum: 1 } } }
]);`}</pre>
      </div>
    </section>
  );
}
