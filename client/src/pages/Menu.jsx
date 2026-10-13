const categories = [
  {
    title: 'Starters',
    note: 'Small plates to begin the meal',
    items: ['Seasonal soup', 'House terrine', 'Market salad'],
  },
  {
    title: 'Main Courses',
    note: 'Classic French cooking, seasonal produce',
    items: ['Pan-seared fish', 'Herb-roasted chicken', 'Vegetable risotto'],
  },
  {
    title: 'Desserts',
    note: 'A quiet close to the evening',
    items: ['Chocolate tart', 'Seasonal fruit', 'Crème caramel'],
  },
  {
    title: 'Beverages',
    note: 'Wine, cocktails, and non-alcoholic selections',
    items: ['House wines', 'Classic cocktails', 'Coffee & tea'],
  },
]

function Menu() {
  return (
    <div className="page">
      <header className="page-header">
        <p className="eyebrow">The kitchen</p>
        <h1>Menu</h1>
        <p className="lede">
          A concise seasonal menu. Dishes and pairings will be added here as
          the kitchen finalizes each service.
        </p>
      </header>

      <div className="menu-grid">
        {categories.map((category) => (
          <article className="panel menu-card" key={category.title}>
            <h2>{category.title}</h2>
            <p className="muted">{category.note}</p>
            <ul>
              {category.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  )
}

export default Menu
