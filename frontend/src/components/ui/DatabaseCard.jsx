import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDatabase,
  faLeaf,
  faServer,
  faArrowRight,
  faStar,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';

export default function DatabaseCard({ 
  title, 
  description, 
  logo, 
  features, 
  colors, 
  link, 
  isActive 
}) {
  return (
    <div 
      className={`db-card animatable ${isActive ? 'active' : ''}`}
      style={{
        '--brand-primary': colors.primary,
        '--brand-secondary': colors.secondary,
      }}
    >
      {/* Card Header with Logo */}
      <div className="db-card-header">
        <div className="db-logo-container">
          <img 
            src={logo} 
            alt={title}
            className="db-logo"
          />
        </div>
        <div className="db-badge">
          <FontAwesomeIcon icon={faDatabase} className="badge-icon" />
          <span>{title}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="db-card-body">
        <p className="db-description">{description}</p>

        {/* Features List */}
        <div className="features-list">
          <h4 className="features-title">
            <FontAwesomeIcon icon={faCheck} className="title-icon" />
            Key Features
          </h4>
          <ul className="feature-items">
            {features.map((feature, idx) => (
              <li key={idx} className="feature-item">
                <span className="feature-dot"></span>
                <span className="feature-text">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Brand Info */}
        <div className="brand-info">
          <div className="info-item">
            <span className="info-label">Type:</span>
            <span className="info-value">{colors.type}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Use Case:</span>
            <span className="info-value">{colors.useCase}</span>
          </div>
        </div>
      </div>

      {/* Card Footer with CTA */}
      <div className="db-card-footer">
        <a href={link} className="db-cta-button">
          <span>Learn More</span>
          <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
        </a>
        <div className="db-rating">
          <FontAwesomeIcon icon={faStar} className="star-icon" />
          <span className="rating-text">Popular</span>
        </div>
      </div>

      {/* Decorative Border Animation */}
      <div className="db-border-animation"></div>
    </div>
  );
}
