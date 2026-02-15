export default function KnowledgeHub() {
  const stages = [
    {
      title: 'First Commit – Stage 1 (MVP Base)',
      area: 'Backend Foundation',
      points: [
        'Initialized Node.js + Express structure with modular routes/controllers/models.',
        'Implemented Users + Events CRUD with MySQL schema and local startup flow.',
        'Established health checks and baseline API contracts.'
      ]
    },
    {
      title: 'Stage 2 – Database Improvement',
      area: 'Relational Design',
      points: [
        'Added Event Registrations table with unique and foreign-key constraints.',
        'Implemented JOIN queries and event statistics endpoint for aggregated insights.',
        'Improved schema idempotency for repeated startup execution.'
      ]
    },
    {
      title: 'Stage 3 – Authentication & RBAC',
      area: 'Security Layer',
      points: [
        'Integrated JWT login/register flow and bcrypt password hashing.',
        'Added role-based authorization to protect Admin-only event creation.',
        'Added token handling and security-aware API responses.'
      ]
    },
    {
      title: 'SQL Update + Duplicate-Key Patch',
      area: 'Schema Stability',
      points: [
        'Fixed SQL compatibility issue for ALTER syntax across MySQL versions.',
        'Patched duplicate index creation issue using existence checks in initializer.',
        'Stabilized startup behavior for existing and fresh databases.'
      ]
    },
    {
      title: 'Stage 4 – Add NoSQL (MongoDB)',
      area: 'Observability',
      points: [
        'Connected MongoDB as secondary store for operational activity logs.',
        'Logged login attempts and API errors using dedicated middleware.',
        'Kept MySQL as primary transactional database (no replacement).' 
      ]
    },
    {
      title: 'Stage 5 – External API Integration',
      area: 'Weather Intelligence',
      points: [
        'Integrated OpenWeather forecast fetch during event creation.',
        'Stored weather snapshot in MySQL with graceful fallback when provider fails.',
        'Added retry with exponential backoff for resilient API calls.'
      ]
    },
    {
      title: 'Stage 6 – Production Hardening',
      area: 'Readiness',
      points: [
        'Added Joi validation, CORS controls, rate limiting, and secure headers.',
        'Centralized environment validation and deployment-safe configuration.',
        'Published Swagger API documentation for integration and QA workflows.'
      ]
    },
    {
      title: 'React Frontend for Existing Backend',
      area: 'Frontend Delivery',
      points: [
        'Built React + Vite UI with functional components and Context API auth.',
        'Implemented protected routing, role-based screens, and Axios token interceptor.',
        'Added events/resources/bookings/dashboard with loading/error/success UX.'
      ]
    }
  ];

  const commands = [
    'npm install',
    'npm run dev',
    'node src/server.js',
    'npm run build',
    'GET /api/health',
    'POST /api/users/register',
    'POST /api/users/login',
    'POST /api/events',
    'GET /api/events/stats',
    'GET /api/docs'
  ];

  const curriculumDays = [
    { day: 'Day 1', focus: 'Foundations & Readiness', hours: '6h' },
    { day: 'Day 2', focus: 'Relational Design & Modeling', hours: '6h' },
    { day: 'Day 3', focus: 'SQL Queries & Operations', hours: '6h' },
    { day: 'Day 4', focus: 'NoSQL Concepts', hours: '6h' },
    { day: 'Day 5', focus: 'API Design & Integration', hours: '6h' },
    { day: 'Day 6', focus: 'Secure DB + API Integration', hours: '6h' },
    { day: 'Day 7', focus: 'Database-Driven Workshop', hours: '6h' },
    { day: 'Day 8', focus: 'External API Workshop', hours: '6h' },
    { day: 'Day 9', focus: 'Showcase & Portfolio', hours: '6h' }
  ];

  return (
    <section className="container page">
      <h1>Knowledge Hub – Developer Journey</h1>

      <div className="card info-banner">
        <h3>Database Management & API Integration</h3>
        <p>
          <strong>Mode:</strong> Offline &nbsp;|&nbsp; <strong>Duration:</strong> 54 Hours &nbsp;|&nbsp;
          <strong>Sessions:</strong> 9 Days
        </p>
        <p>
          <strong>Target Audience:</strong> BCA Students &nbsp;|&nbsp; <strong>NSQF Equivalent:</strong> Level 4–5
        </p>
      </div>

      <div className="grid hub-grid">
        {stages.map((stage) => (
          <article className="card stage-card" key={stage.title}>
            <div className="stage-tag">{stage.area}</div>
            <h3>{stage.title}</h3>
            <ul className="list">
              {stage.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="card">
        <h3>Command Steps Followed (Developer Workflow)</h3>
        <p className="meta-text">Core execution pattern used repeatedly through build, test, and patch cycles:</p>
        <div className="command-grid">
          {commands.map((command) => (
            <div className="command-chip" key={command}>
              {command}
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3>9-Day Learning Track Mapping</h3>
        <p className="meta-text">
          This project is aligned as a practical capstone for the full database + API integration program.
        </p>
        <div className="timeline">
          {curriculumDays.map((item) => (
            <div className="timeline-item" key={item.day}>
              <div className="timeline-day">{item.day}</div>
              <div>
                <strong>{item.focus}</strong>
                <div className="meta-text">{item.hours}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3>Infrastructure & Tooling Baseline</h3>
        <ul className="list">
          <li>System: 8 GB RAM minimum (16 GB preferred), internet for docs and references.</li>
          <li>Databases: MySQL (primary relational) + MongoDB (NoSQL logging).</li>
          <li>API Testing: Thunder Client / Postman.</li>
          <li>Source Control: Git + GitHub workflow.</li>
          <li>Runtime: Node.js backend and React + Vite frontend.</li>
        </ul>
      </div>
    </section>
  );
}
