import { Link } from 'react-router-dom'
import homeHero from '../assets/images/home-cafe-fausse.webp'

function Home() {
  return (
    <div className="page home-page">
      {/* FR-1: Prominent Café Fausse Branding & Hero */}
      <section className="hero-section">
        <div className="hero-content">
          <p className="eyebrow">FRENCH FINE DINING</p>
          <h1 className="brand-title">Café Fausse</h1>
          <p className="lede">
            An intimate dining room where seasonal French cooking, quiet service, and
            candlelight set the evening.
          </p>
          <div className="hero-actions">
            <Link to="/reservations" className="button button-primary">
              RESERVE A TABLE
            </Link>
            <Link to="/menu" className="button button-outline">
              EXPLORE THE MENU
            </Link>
          </div>
        </div>
        <div className="hero-image-wrapper">
          <img
            src={homeHero}
            alt="Café Fausse dining room"
            className="hero-image"
            loading="eager"
          />
        </div>
      </section>

      {/* FR-2: Contact Information and Hours */}
      <section className="info-bar-section">
        <div className="info-card">
          <h3 className="info-heading">Location</h3>
          <p>1234 Culinary Ave, Suite 100</p>
          <p>Washington, DC 20002</p>
        </div>

        <div className="info-card">
          <h3 className="info-heading">Reservations & Inquiries</h3>
          <p>
            <a href="tel:2025554567" className="info-link">
              (202) 555-4567
            </a>
          </p>
          <p className="info-subtext">Online booking available daily</p>
        </div>

        <div className="info-card">
          <h3 className="info-heading">Hours of Operation</h3>
          <p>
            <strong>Mon – Sat:</strong> 5:00 PM – 11:00 PM
          </p>
          <p>
            <strong>Sunday:</strong> 5:00 PM – 9:00 PM
          </p>
        </div>
      </section>
    </div>
  )
}

export default Home