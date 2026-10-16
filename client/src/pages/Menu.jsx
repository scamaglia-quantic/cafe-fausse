const menuData = [
  {
    category: 'Starters',
    subtitle: 'Small plates to begin the meal',
    items: [
      {
        name: 'Bruschetta',
        price: '$8.50',
        description: 'Fresh tomatoes, basil, olive oil, and toasted baguette slices',
      },
      {
        name: 'Caesar Salad',
        price: '$9.00',
        description: 'Crisp romaine with homemade Caesar dressing',
      },
    ],
  },
  {
    category: 'Main Courses',
    subtitle: 'Classic dishes crafted with seasonal ingredients',
    items: [
      {
        name: 'Grilled Salmon',
        price: '$22.00',
        description: 'Served with lemon butter sauce and seasonal vegetables',
      },
      {
        name: 'Ribeye Steak',
        price: '$28.00',
        description: '12 oz prime cut with garlic mashed potatoes',
      },
      {
        name: 'Vegetable Risotto',
        price: '$18.00',
        description: 'Creamy Arborio rice with wild mushrooms',
      },
    ],
  },
  {
    category: 'Desserts',
    subtitle: 'Traditional sweet finishes',
    items: [
      {
        name: 'Tiramisu',
        price: '$7.50',
        description: 'Classic Italian dessert with mascarpone',
      },
      {
        name: 'Cheesecake',
        price: '$7.00',
        description: 'Creamy cheesecake with berry compote',
      },
    ],
  },
  {
    category: 'Beverages',
    subtitle: 'Curated wines, craft beer, and coffee',
    items: [
      {
        name: 'Red Wine (Glass)',
        price: '$10.00',
        description: 'A selection of Italian reds',
      },
      {
        name: 'White Wine (Glass)',
        price: '$9.00',
        description: 'Crisp and refreshing',
      },
      {
        name: 'Craft Beer',
        price: '$6.00',
        description: 'Local artisan brews',
      },
      {
        name: 'Espresso',
        price: '$3.00',
        description: 'Strong and aromatic',
      },
    ],
  },
]

function Menu() {
  return (
    <div className="page menu-page">
      <header className="page-header">
        <p className="eyebrow">Culinary Selections</p>
        <h1>Our Menu</h1>
        <p className="lede">
          Experience classic Italian culinary traditions prepared with modern refinement and seasonal ingredients.
        </p>
      </header>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          marginTop: '2.5rem',
        }}
      >
        {menuData.map((section, idx) => (
          <section
            key={idx}
            style={{
              flex: '1 1 calc(50% - 2rem)',
              minWidth: '320px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '6px',
              padding: '1.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: 'Playfair Display, serif, Georgia',
                  fontSize: '1.5rem',
                  color: '#c5a880',
                  margin: '0 0 0.25rem 0',
                }}
              >
                {section.category}
              </h2>
              <p style={{ margin: 0, color: '#888', fontSize: '0.85rem' }}>
                {section.subtitle}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {section.items.map((item, itemIdx) => (
                <div key={itemIdx}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      borderBottom: '1px dotted rgba(255, 255, 255, 0.15)',
                      paddingBottom: '0.25rem',
                    }}
                  >
                    <span style={{ fontWeight: '600', color: '#ffffff', fontSize: '1rem' }}>
                      {item.name}
                    </span>
                    <span style={{ color: '#c5a880', fontWeight: '600', fontSize: '1rem', marginLeft: '1rem' }}>
                      {item.price}
                    </span>
                  </div>
                  <p
                    style={{
                      margin: '0.35rem 0 0 0',
                      color: '#aaaaaa',
                      fontSize: '0.875rem',
                      lineHeight: '1.4',
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

export default Menu