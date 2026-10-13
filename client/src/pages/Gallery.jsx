const frames = [
  'Dining room at dusk',
  'Linen and candlelight',
  'Seasonal starter',
  'The pass',
  'Wine service',
  'Dessert course',
]

function Gallery() {
  return (
    <div className="page">
      <header className="page-header">
        <p className="eyebrow">The room</p>
        <h1>Gallery</h1>
        <p className="lede">
          A look at the dining room, the kitchen, and the plates we send to
          the table. Photographs will replace these frames.
        </p>
      </header>

      <div className="image-grid gallery-grid">
        {frames.map((caption) => (
          <figure className="gallery-item" key={caption}>
            <div className="placeholder-image" />
            <figcaption>{caption}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}

export default Gallery
