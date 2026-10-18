import { Link } from 'react-router-dom';
import NewsletterSignup from './NewsletterSignup';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-newsletter-wrapper" style={{ maxWidth: '600px', margin: '0 auto 2.5rem', textAlign: 'center' }}>
        <NewsletterSignup />
      </div>

      <div className="footer-compact-container">
        <div className="footer-brand">
          <span className="footer-logo">Café Fausse</span>
          <span className="footer-tagline">French Fine Dining • Washington, DC</span>
        </div>
        <nav className="footer-nav">
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/reservations">Reservations</Link>
          <Link to="/about">About Us</Link>
          <Link to="/gallery">Gallery</Link>
        </nav>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Café Fausse. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;