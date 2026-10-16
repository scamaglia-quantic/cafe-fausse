import chefImg from '../assets/images/Chef_Unit2Project.jpeg'
import ownerImg from '../assets/images/Owner_Unit2Project.jpeg'

const founders = [
  {
    name: 'Chef Antonio Rossi',
    role: 'Co-Founder & Executive Chef',
    bio: 'Born and classically trained in Italy, Chef Antonio Rossi brings over two decades of culinary mastery to Café Fausse. Renowned for balancing heritage techniques with contemporary gastronomy, Antonio crafts each plate around peak seasonal produce and artisanal traditions.',
    image: chefImg,
    alt: 'Chef Antonio Rossi in kitchen uniform',
  },
  {
    name: 'Maria Lopez',
    role: 'Co-Founder & Lead Restaurateur',
    bio: 'With an extensive career directing premier hospitality ventures across Europe and the United States, Maria Lopez leads Café Fausse with a dedication to genuine warmth, seamless dining service, and an elevated guest journey from arrival to departure.',
    image: ownerImg,
    alt: 'Restaurateur Maria Lopez',
  },
]

const commitments = [
  {
    title: 'Unforgettable Dining',
    description: 'We believe exceptional dining extends beyond the plate. Our dining room is designed to cultivate warmth, intimacy, and lasting memories through attentive, quiet service.',
  },
  {
    title: 'Excellence in Food',
    description: 'Every dish represents a balance of traditional heritage and modern culinary innovation, executed with precision technique and disciplined attention to detail.',
  },
  {
    title: 'Locally Sourced Ingredients',
    description: 'We partner directly with regional growers, artisanal purveyors, and sustainable fisheries to ensure our kitchen cooks with the freshest, highest-quality seasonal ingredients daily.',
  },
]

function About() {
  return (
    <div className="page about-page">
      {/* FR-10: Detailed History & Mission */}
      <header className="page-header">
        <p className="eyebrow">Our Heritage</p>
        <h1>About Café Fausse</h1>
        <p className="lede" style={{ maxWidth: '850px' }}>
          Founded in 2010 by Chef Antonio Rossi and restaurateur Maria Lopez, Café Fausse
          blends traditional Italian flavors with modern culinary innovation. Our mission is to
          provide an unforgettable dining experience that reflects both quality and creativity.
        </p>
      </header>

      {/* FR-11: Core Commitments */}
      <section className="commitments-section" style={{ marginTop: '3.5rem' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif, Georgia', color: '#c5a880', marginBottom: '1.5rem', fontSize: '1.6rem' }}>
          Our Culinary Philosophy
        </h2>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          {commitments.map((item, idx) => (
            <div
              key={idx}
              style={{
                flex: '1 1 280px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '6px',
                padding: '1.5rem',
              }}
            >
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#ffffff', fontSize: '1.15rem' }}>
                {item.title}
              </h3>
              <p style={{ margin: 0, color: '#aaa', fontSize: '0.95rem', lineHeight: '1.6' }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FR-11: Founder Biographies */}
      <section className="founders-section" style={{ marginTop: '4rem' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif, Georgia', color: '#c5a880', marginBottom: '2rem', fontSize: '1.6rem' }}>
          Meet the Founders
        </h2>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '2.5rem',
            justifyContent: 'space-between',
          }}
        >
          {founders.map((person, idx) => (
            <article
              key={idx}
              style={{
                flex: '1 1 340px',
                display: 'flex',
                flexDirection: 'column',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '6px',
                overflow: 'hidden',
                padding: '1.5rem',
                gap: '1.25rem',
              }}
            >
              <img
                src={person.image}
                alt={person.alt}
                style={{
                  width: '100%',
                  height: '340px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                }}
                loading="lazy"
              />
              <div>
                <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.3rem', color: '#ffffff' }}>
                  {person.name}
                </h3>
                <p style={{ color: '#c5a880', fontSize: '0.9rem', margin: '0 0 0.75rem 0', fontWeight: '600', letterSpacing: '0.04em' }}>
                  {person.role}
                </p>
                <p style={{ color: '#bbbbbb', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                  {person.bio}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default About