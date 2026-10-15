import React, { useState } from 'react';

export default function Reservations() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    timeSlot: '',
    guests: '2',
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState(null);

  const validateEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (serverError) setServerError('');
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!validateEmail(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else {
      const numericDigits = formData.phone.replace(/\D/g, '');
      if (numericDigits.length < 10) {
        newErrors.phone = 'Please provide a valid 10-digit phone number with area code.';
      }
    }

    if (!formData.date) {
      newErrors.date = 'Reservation date is required.';
    }

    if (!formData.timeSlot) {
      newErrors.timeSlot = 'Please select a dining time slot.';
    }

    if (!formData.guests) {
      newErrors.guests = 'Please select party size.';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          date: formData.date,
          time: formData.timeSlot,
          guests: parseInt(formData.guests, 10),
          specialRequests: '',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit reservation.');
      }

      setSubmittedBooking({
        ...formData,
        reservationId: data.reservationId,
      });
    } catch (err) {
      setServerError(err.message || 'Unable to connect to server. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      timeSlot: '',
      guests: '2',
    });
    setErrors({});
    setServerError('');
    setSubmittedBooking(null);
  };

  return (
    <div className="page-container reservations-page">
      <div className="section-header">
        <h1>Reserve a Table</h1>
        <p>Join us for an evening of modern French cuisine in an intimate atmosphere.</p>
      </div>

      {submittedBooking ? (
        <div className="confirmation-card">
          <div className="confirmation-badge">Reservation Confirmed</div>
          <h2>We look forward to welcoming you, {submittedBooking.name}!</h2>
          <p className="confirmation-subtitle">
            A confirmation email will be sent to <strong>{submittedBooking.email}</strong>.
            {submittedBooking.reservationId && (
              <span> (Confirmation #{submittedBooking.reservationId})</span>
            )}
          </p>

          <div className="booking-summary-grid">
            <div className="summary-item">
              <span className="summary-label">Date</span>
              <span className="summary-val">{submittedBooking.date}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Time</span>
              <span className="summary-val">{submittedBooking.timeSlot}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Guests</span>
              <span className="summary-val">{submittedBooking.guests} People</span>
            </div>
            {submittedBooking.phone && (
              <div className="summary-item">
                <span className="summary-label">Contact</span>
                <span className="summary-val">{submittedBooking.phone}</span>
              </div>
            )}
          </div>

          <button type="button" onClick={handleReset} className="btn-primary reset-btn">
            Book Another Reservation
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="reservation-form" noValidate>
          {serverError && (
            <div className="error-banner" style={{ color: '#d9534f', marginBottom: '1rem', fontWeight: 'bold' }}>
              {serverError}
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Eleanor Vance"
                value={formData.name}
                onChange={handleChange}
                className={`reservation-input ${errors.name ? 'input-error' : ''}`}
                disabled={isSubmitting}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="eleanor@example.com"
                value={formData.email}
                onChange={handleChange}
                className={`reservation-input ${errors.email ? 'input-error' : ''}`}
                disabled={isSubmitting}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="(614) 555-0199"
                value={formData.phone}
                onChange={handleChange}
                className={`reservation-input ${errors.phone ? 'input-error' : ''}`}
                disabled={isSubmitting}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="guests">Number of Guests *</label>
              <select
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className="reservation-input"
                disabled={isSubmitting}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Reservation Date *</label>
              <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                className={`reservation-input ${errors.date ? 'input-error' : ''}`}
                disabled={isSubmitting}
              />
              {errors.date && <span className="error-message">{errors.date}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="timeSlot">Dining Time *</label>
              <select
                id="timeSlot"
                name="timeSlot"
                value={formData.timeSlot}
                onChange={handleChange}
                className={`reservation-input ${errors.timeSlot ? 'input-error' : ''}`}
                disabled={isSubmitting}
              >
                <option value="">Select a time slot</option>
                <option value="5:00 PM">5:00 PM</option>
                <option value="5:30 PM">5:30 PM</option>
                <option value="6:00 PM">6:00 PM</option>
                <option value="6:30 PM">6:30 PM</option>
                <option value="7:00 PM">7:00 PM</option>
                <option value="7:30 PM">7:30 PM</option>
                <option value="8:00 PM">8:00 PM</option>
                <option value="8:30 PM">8:30 PM</option>
                <option value="9:00 PM">9:00 PM</option>
              </select>
              {errors.timeSlot && <span className="error-message">{errors.timeSlot}</span>}
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary submit-booking-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting Reservation...' : 'Confirm Reservation Request'}
          </button>
        </form>
      )}
    </div>
  );
}