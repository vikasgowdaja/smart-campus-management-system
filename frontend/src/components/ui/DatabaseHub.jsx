import DatabaseCard from './DatabaseCard';
import mysqlLogo from '../../assets/mysql.svg';
import mongodbLogo from '../../assets/mongodb.svg';
import postgresqlLogo from '../../assets/postgresql.svg';

export default function DatabaseHub() {
  const databases = [
    {
      title: 'MySQL',
      description: 'Reliable relational database for structured data and transactions.',
      logo: mysqlLogo,
      features: [
        'ACID Transactions',
        'Complex Queries',
        'Structured Data',
        'Enterprise Support'
      ],
      colors: {
        primary: '#00758F',
        secondary: '#F29111',
        type: 'Relational',
        useCase: 'Web Applications'
      },
      link: '/knowledge/mysql'
    },
    {
      title: 'PostgreSQL',
      description: 'Advanced open-source database with powerful JSON support.',
      logo: postgresqlLogo,
      features: [
        'JSON Support',
        'Full-Text Search',
        'Advanced Indexing',
        'Extensibility'
      ],
      colors: {
        primary: '#336791',
        secondary: '#8fd3ff',
        type: 'Relational',
        useCase: 'Data Analytics'
      },
      link: '/knowledge/postgresql'
    },
    {
      title: 'MongoDB',
      description: 'Flexible document database for scalable and fast-growing apps.',
      logo: mongodbLogo,
      features: [
        'Document Storage',
        'Horizontal Scaling',
        'Flexible Schema',
        'Global Replication'
      ],
      colors: {
        primary: '#47A248',
        secondary: '#13aa52',
        type: 'NoSQL',
        useCase: 'Real-time Apps'
      },
      link: '/knowledge/mongodb'
    }
  ];

  return (
    <section className="database-hub">
      <div className="hub-container">
        <div className="hub-header">
          <h2 className="hub-title">Database Management Solutions</h2>
          <p className="hub-subtitle">
            Explore production-ready databases with official brand guidelines and modern UI
          </p>
        </div>

        <div className="database-grid">
          {databases.map((db, index) => (
            <DatabaseCard
              key={index}
              {...db}
              isActive={index === 1}
            />
          ))}
        </div>

        <div className="hub-footer">
          <div className="footer-stat">
            <span className="stat-icon">📊</span>
            <div>
              <h4>Optimized Performance</h4>
              <p>Lightning-fast queries and indexing</p>
            </div>
          </div>
          <div className="footer-stat">
            <span className="stat-icon">🔒</span>
            <div>
              <h4>Enterprise Security</h4>
              <p>Industry standard encryption</p>
            </div>
          </div>
          <div className="footer-stat">
            <span className="stat-icon">🚀</span>
            <div>
              <h4>Scalable Architecture</h4>
              <p>Grow without limits</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
