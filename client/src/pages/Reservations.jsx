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
  const [apiError, setApiError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState(null);

  const validateEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (apiError) {
      setApiError('');
    }
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

    // Phone is strictly optional: only validates if numbers are entered
    if (formData.phone && formData.phone.trim()) {
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

    const guestCount = parseInt(formData.guests, 10);
    if (!guestCount || guestCount < 1) {
      newErrors.guests = 'Party size must be at least 1 guest.';
    } else if (guestCount > 10) {
      newErrors.guests = 'For parties larger than 10, please contact our events team directly.';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || null,
          date: formData.date,
          time: formData.timeSlot,
          guests: parseInt(formData.guests, 10),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setApiError(data.error || 'Unable to complete reservation. Please try again.');
        return;
      }

      setSubmittedBooking({
        ...formData,
        tableNumber: data.table_number || data.tableNumber || data.reservation?.table_number,
      });
    } catch (err) {
      setApiError('Unable to connect to the reservation service. Ensure the server is running.');
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
    setApiError('');
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
            {submittedBooking.tableNumber && (
              <div className="summary-item">
                <span className="summary-label">Assigned Table</span>
                <span className="summary-val">Table #{submittedBooking.tableNumber}</span>
              </div>
            )}
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
          {apiError && <div className="error-banner">{apiError}</div>}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Jane Doe"
                value={formData.name}
                onChange={handleChange}
                className={`reservation-input ${errors.name ? 'input-error' : ''}`}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="jane@example.com"
                value={formData.email}
                onChange={handleChange}
                className={`reservation-input ${errors.email ? 'input-error' : ''}`}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Phone Number (Optional)</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="(614) 555-0199"
                value={formData.phone}
                onChange={handleChange}
                className={`reservation-input ${errors.phone ? 'input-error' : ''}`}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="guests">Number of Guests *</label>
              <input
                id="guests"
                name="guests"
                type="number"
                min="1"
                max="10"
                value={formData.guests}
                onChange={handleChange}
                className={`reservation-input ${errors.guests ? 'input-error' : ''}`}
              />
              {errors.guests && <span className="error-message">{errors.guests}</span>}
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

          <button type="submit" disabled={isSubmitting} className="btn-primary submit-booking-btn">
            {isSubmitting ? 'Confirming...' : 'Confirm Reservation Request'}
          </button>
        </form>
      )}
    </div>
  );
}