import React from 'react';
import NewsletterSignup from './NewsletterSignup';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <NewsletterSignup />
        
        <div className="footer-details">
          <div className="footer-col">
            <h4>Café Fausse</h4>
            <p>1248 Gourmet Way</p>
            <p>Grandview Heights, OH 43212</p>
            <p>Phone: (614) 555-0192</p>
          </div>
          <div className="footer-col">
            <h4>Hours of Operation</h4>
            <p>Tuesday – Thursday: 5:00 PM – 10:00 PM</p>
            <p>Friday – Saturday: 5:00 PM – 11:00 PM</p>
            <p>Sunday – Monday: Closed</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Café Fausse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
