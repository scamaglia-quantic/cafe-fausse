import { useState, useEffect } from 'react'
import cafeInterior from '../assets/images/gallery-cafe-interior.webp'
import ribeyeSteak from '../assets/images/gallery-ribeye-steak.webp'
import specialEvent from '../assets/images/gallery-special-event.webp'

const galleryImages = [
  {
    id: 'interior',
    src: cafeInterior,
    alt: 'Interior ambiance of Café Fausse at dusk',
    caption: 'Interior Ambiance – Dining room at dusk',
  },
  {
    id: 'dish',
    src: ribeyeSteak,
    alt: 'Pan-seared ribeye steak entrée',
    caption: 'Menu Dishes – Pan-seared ribeye with seasonal garnish',
  },
  {
    id: 'event',
    src: specialEvent,
    alt: 'Special events and private dining',
    caption: 'Special Events – Evening wine pairings and gatherings',
  },
]

const awards = [
  { title: 'Culinary Excellence Award', year: '2022' },
  { title: 'Restaurant of the Year', year: '2023' },
  { title: 'Best Fine Dining Experience', organization: 'Foodie Magazine', year: '2023' },
]

const reviews = [
  {
    quote: 'Exceptional ambiance and unforgettable flavors.',
    source: 'Gourmet Review',
  },
  {
    quote: 'A must-visit restaurant for food enthusiasts.',
    source: 'The Daily Bite',
  },
]

function Gallery() {
  const [activeImage, setActiveImage] = useState(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveImage(null)
      }
    }
    if (activeImage) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeImage])

  return (
    <div className="page gallery-page">
      <header className="page-header">
        <p className="eyebrow">The Room & Accolades</p>
        <h1>Gallery</h1>
        <p className="lede">
          A look at the dining room, the kitchen, and the accolades that define Café Fausse. Click any image to view enlarged.
        </p>
      </header>

      {/* FR-12: High-Resolution Photo Collection */}
      <section className="gallery-section" style={{ marginTop: '2rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
          {galleryImages.map((img) => (
            <figure
              key={img.id}
              onClick={() => setActiveImage(img)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActiveImage(img)}
              style={{
                flex: '1 1 calc(33.333% - 1.5rem)',
                minWidth: '260px',
                cursor: 'pointer',
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                style={{
                  width: '100%',
                  height: '240px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              />
              <figcaption style={{ marginTop: '0.5rem', color: '#c5a880', fontSize: '0.9rem' }}>
                {img.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FR-14: Awards */}
      <section style={{ marginTop: '3.5rem' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#c5a880', marginBottom: '1.25rem' }}>
          Awards & Honors
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
          {awards.map((award, idx) => (
            <div
              key={idx}
              style={{
                flex: '1 1 calc(33.333% - 1.5rem)',
                minWidth: '250px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '1.25rem',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <span style={{ fontSize: '1.8rem' }}>🏆</span>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#ffffff' }}>{award.title}</h3>
                <p style={{ margin: '0.25rem 0 0 0', color: '#888', fontSize: '0.85rem' }}>
                  {award.organization ? `${award.organization} • ` : ''}
                  {award.year}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FR-14: Reviews */}
      <section style={{ marginTop: '3.5rem' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#c5a880', marginBottom: '1.25rem' }}>
          Critical Acclaim
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
          {reviews.map((rev, idx) => (
            <blockquote
              key={idx}
              style={{
                flex: '1 1 calc(50% - 1.5rem)',
                minWidth: '280px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '1.5rem',
                borderRadius: '4px',
                margin: 0,
              }}
            >
              <p style={{ fontStyle: 'italic', margin: '0 0 0.75rem 0', color: '#ddd', lineHeight: '1.5' }}>
                “{rev.quote}”
              </p>
              <footer style={{ color: '#c5a880', fontSize: '0.85rem', fontWeight: 600 }}>
                — {rev.source}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* FR-13: Interactive Lightbox Modal */}
      {activeImage && (
        <div
          onClick={() => setActiveImage(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            padding: '2rem',
            boxSizing: 'border-box',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '900px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <button
              type="button"
              onClick={() => setActiveImage(null)}
              aria-label="Close image preview"
              style={{
                position: 'absolute',
                top: '-45px',
                right: '0',
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                fontSize: '2.5rem',
                cursor: 'pointer',
                lineHeight: 1,
              }}
            >
              &times;
            </button>
            <img
              src={activeImage.src}
              alt={activeImage.alt}
              style={{
                maxWidth: '100%',
                maxHeight: '75vh',
                objectFit: 'contain',
                borderRadius: '6px',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.8)',
              }}
            />
            <p
              style={{
                marginTop: '1rem',
                color: '#ffffff',
                fontSize: '1rem',
                textAlign: 'center',
              }}
            >
              {activeImage.caption}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Gallery