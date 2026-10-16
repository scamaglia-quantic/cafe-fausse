import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer style={{ marginTop: '4rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', padding: '2rem 1.5rem 1.5rem' }}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1.5rem',
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'Playfair Display, serif, Georgia', fontSize: '1.1rem', color: '#c5a880', fontWeight: '600' }}>
            Café Fausse
          </span>
          <span style={{ color: '#666' }}>•</span>
          <span style={{ fontSize: '0.9rem', color: '#888888' }}>
            French Fine Dining • Washington, DC
          </span>
        </div>

        <nav style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
          <Link to="/" style={{ color: '#bbbbbb', textDecoration: 'none', fontSize: '0.9rem' }}>Home</Link>
          <Link to="/menu" style={{ color: '#bbbbbb', textDecoration: 'none', fontSize: '0.9rem' }}>Menu</Link>
          <Link to="/reservations" style={{ color: '#bbbbbb', textDecoration: 'none', fontSize: '0.9rem' }}>Reservations</Link>
          <Link to="/about" style={{ color: '#bbbbbb', textDecoration: 'none', fontSize: '0.9rem' }}>About Us</Link>
          <Link to="/gallery" style={{ color: '#bbbbbb', textDecoration: 'none', fontSize: '0.9rem' }}>Gallery</Link>
        </nav>
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)', fontSize: '0.8rem', color: '#666666' }}>
        <p>&copy; {new Date().getFullYear()} Café Fausse. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer