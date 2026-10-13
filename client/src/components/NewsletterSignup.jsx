import React, { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const validateEmail = (val) => {
    // Basic standard email pattern check (contains text, @, text, ., text)
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Email address is required.');
      return;
    }

    if (!validateEmail(email.trim())) {
      setError('Please enter a valid email address (e.g., name@example.com).');
      return;
    }

    // Mock confirmation for now (we will wire to Flask/Postgres next)
    console.log('Newsletter signup submitted:', email.trim());
    setSuccess(true);
  };

  const handleReset = () => {
    setEmail('');
    setSuccess(false);
    setError('');
  };

  return (
    <div className="newsletter-container">
      <h3>Join the Café Fausse Circle</h3>
      <p>Subscribe for seasonal menu previews, exclusive events, and culinary updates.</p>

      {success ? (
        <div className="newsletter-success">
          <p>Thank you for subscribing to Café Fausse updates!</p>
          <button type="button" onClick={handleReset} className="btn-secondary">
            Sign Up Another Email
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="newsletter-form" noValidate>
          <div className="newsletter-input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
              placeholder="Enter your email address"
              className={error ? 'input-error' : ''}
            />
            <button type="submit" className="btn-primary">
              Subscribe
            </button>
          </div>
          {error && <p className="error-message">{error}</p>}
        </form>
      )}
    </div>
  );
}