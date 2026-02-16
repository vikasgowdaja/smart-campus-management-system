import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCode,
  faLink,
  faShare,
  faGlobe,
  faCopyright,
  faEnvelope,
  faMapMarkerAlt,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="prod-footer">
      <div className="footer-container">
        {/* Footer Grid */}
        <div className="footer-grid">
          {/* Column 1: About */}
          <div className="footer-column">
            <h3 className="footer-title">About Smart Campus</h3>
            <p className="footer-text">
              Empowering education through intelligent event management and knowledge sharing.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link" title="GitHub">
                <i className="fab fa-github"></i>
              </a>
              <a href="#" className="social-link" title="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-link" title="LinkedIn">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="social-link" title="Website">
                <FontAwesomeIcon icon={faGlobe} />
              </a>
            </div>
          </div>

          {/* Column 2: Product */}
          <div className="footer-column">
            <h3 className="footer-title">Product</h3>
            <ul className="footer-list">
              <li>
                <a href="/events" className="footer-link">Events</a>
              </li>
              <li>
                <a href="/knowledge-hub" className="footer-link">Knowledge Hub</a>
              </li>
              <li>
                <a href="/resources" className="footer-link">Resources</a>
              </li>
              <li>
                <a href="/bookings" className="footer-link">Bookings</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="footer-column">
            <h3 className="footer-title">Resources</h3>
            <ul className="footer-list">
              <li>
                <a href="/knowledge/mysql" className="footer-link">MySQL Guide</a>
              </li>
              <li>
                <a href="/knowledge/postgresql" className="footer-link">PostgreSQL Guide</a>
              </li>
              <li>
                <a href="/knowledge/mongodb" className="footer-link">MongoDB Guide</a>
              </li>
              <li>
                <a href="/knowledge/scenarios" className="footer-link">Use Cases</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="footer-column">
            <h3 className="footer-title">Get in Touch</h3>
            <ul className="contact-list">
              <li className="contact-item">
                <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
                <a href="mailto:info@smartcampus.edu">info@smartcampus.edu</a>
              </li>
              <li className="contact-item">
                <FontAwesomeIcon icon={faPhone} className="contact-icon" />
                <a href="tel:+1234567890">+1 (234) 567-890</a>
              </li>
              <li className="contact-item">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="contact-icon" />
                <address>123 University Ave, Campus City, ST 12345</address>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Divider */}
        <div className="footer-divider"></div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            <FontAwesomeIcon icon={faCopyright} className="copyright-icon" />
            {currentYear} Smart Campus. All rights reserved.
          </p>
          <div className="footer-legal">
            <a href="#" className="legal-link">Privacy Policy</a>
            <a href="#" className="legal-link">Terms of Service</a>
            <a href="#" className="legal-link">Cookie Policy</a>
          </div>
        </div>
      </div>

      {/* Background Gradient */}
      <div className="footer-gradient"></div>
    </footer>
  );
}
