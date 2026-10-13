function About() {
  return (
    <div className="page">
      <header className="page-header">
        <p className="eyebrow">Our house</p>
        <h1>About Us</h1>
        <p className="lede">
          Café Fausse is a neighborhood restaurant devoted to French cooking,
          unhurried service, and a dining room that feels like a private home.
        </p>
      </header>

      <section className="story panel">
        <h2>The restaurant</h2>
        <p>
          Opened in 2010, Café Fausse was built around a simple idea: a small
          dining room, a seasonal kitchen, and a wine list that favors growers
          over spectacle. The room is quiet by design—linen, low light, and
          enough space between tables for a long conversation.
        </p>
      </section>

      <div className="owners-grid">
        <article className="owner-card">
          <div className="image-grid owner-photos" aria-hidden="true">
            <div className="placeholder-image" />
            <div className="placeholder-image" />
          </div>
          <h2>Claire Moreau</h2>
          <p className="muted">Chef &amp; co-owner</p>
          <p>
            Claire trained in Lyon and spent years in Paris kitchens before
            moving to New York. Her cooking is classical without being stiff:
            stocks, sauces, and market vegetables treated with patience. She
            writes a short menu each week so every plate can be finished with
            care.
          </p>
        </article>

        <article className="owner-card">
          <div className="image-grid owner-photos" aria-hidden="true">
            <div className="placeholder-image" />
            <div className="placeholder-image" />
          </div>
          <h2>Henri Moreau</h2>
          <p className="muted">Wine director &amp; co-owner</p>
          <p>
            Henri looks after the floor and the cellar. He prefers bottles that
            drink well with food—Loire whites, Burgundy, and a handful of
            growers from the Rhône. Guests often meet him first at the door,
            then again when a glass arrives that quietly suits the table.
          </p>
        </article>
      </div>
    </div>
  )
}

export default About
