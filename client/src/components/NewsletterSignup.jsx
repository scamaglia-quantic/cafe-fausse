import React, { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (val) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(val);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError('Email address is required.');
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setError('Please enter a valid email address (e.g., name@example.com).');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe.');
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Unable to connect to server. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
              disabled={isSubmitting}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
              placeholder="Enter your email address"
              className={error ? 'input-error' : ''}
            />
            <button type="submit" className="btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>
          {error && <p className="error-message">{error}</p>}
        </form>
      )}
    </div>
  );
}