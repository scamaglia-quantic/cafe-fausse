import { Link } from 'react-router-dom'
import { useState } from 'react'

function Home() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  function handleNewsletter(event) {
    event.preventDefault()
    setMessage(`Thank you. ${email} has been added to our list.`)
    setEmail('')
  }

  return (
    <div className="page">
      <section className="hero">
        <p className="eyebrow">French fine dining in New York</p>
        <h1>Café Fausse</h1>
        <p className="lede">
          An intimate dining room where seasonal French cooking, quiet service,
          and candlelight set the evening.
        </p>
        <div className="hero-actions">
          <Link className="btn" to="/reservations">
            Reserve a table
          </Link>
          <Link className="btn btn-ghost" to="/menu">
            Explore the menu
          </Link>
        </div>
      </section>

      <section className="split-section">
        <article className="panel">
          <h2>Hours</h2>
          <ul className="hours-list">
            <li>
              <span>Tuesday – Thursday</span>
              <span>5:00 PM – 10:00 PM</span>
            </li>
            <li>
              <span>Friday – Saturday</span>
              <span>5:00 PM – 11:00 PM</span>
            </li>
            <li>
              <span>Sunday</span>
              <span>5:00 PM – 9:00 PM</span>
            </li>
            <li>
              <span>Monday</span>
              <span>Closed</span>
            </li>
          </ul>
        </article>

        <article className="panel">
          <h2>Contact</h2>
          <p>123 Fulton Street</p>
          <p>New York, NY 10038</p>
          <p>
            <a href="tel:+12125550123">(212) 555-0123</a>
          </p>
          <p>
            <a href="mailto:reservations@cafefausse.com">
              reservations@cafefausse.com
            </a>
          </p>
        </article>
      </section>

      <section className="panel newsletter">
        <h2>Newsletter</h2>
        <p>
          Seasonal menus, wine dinners, and announcements, sent sparingly.
        </p>
        <form className="newsletter-form" onSubmit={handleNewsletter}>
          <label htmlFor="newsletter-email">Email address</label>
          <div className="form-row">
            <input
              id="newsletter-email"
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <button className="btn" type="submit">
              Sign up
            </button>
          </div>
        </form>
        {message ? <p className="form-success">{message}</p> : null}
      </section>
    </div>
  )
}

export default Home
