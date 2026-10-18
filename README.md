##Project Overview
The Café Fausse website is a responsive, full-stack web applicable for the aforementioned fine-dining restaurant. It is built with a React frontend, Flask RESTful API backend, and normalized PostgreSQL relational database.


##Tech Stack
    Frontend: React 18, Vite, React Router DOM, Vanilla CSS (Flexbox & Grid)
    Backend: Python 3.11+, Flask, Flask-CORS, psycopg2-binary, python-dotenv
    Database: PostgreSQL (v18), pgAdmin 4
    Development Tooling: Gemini, Cursor IDE, npm, Python venv
    Version Control: Git.


##Repository Tree
cafe-fausse/
├── .gitignore               # Excludes secrets (.env), dependencies, and virtual environments from Git
├── README.md                # Primary documentation, setup steps, architecture, and verification
├── ai-tooling.md            # Audit log of the human-AI workflow, prompt governance, and tooling
├── package.json             # Frontend dependency manifest and npm build/start scripts
├── package-lock.json        # Deterministic dependency lockfile for Node runtimes
├── vite.config.js           # Vite configuration for local development and build tooling
├── index.html               # Main HTML entry point mounting the root React DOM node
│
├── src/                     # Client application source code (React 18)
│   ├── main.jsx             # React entry point initializing the Virtual DOM root
│   ├── App.jsx              # Core client router and application shell layout
│   ├── App.css              # Page-specific styling rules built with native CSS Flexbox/Grid
│   ├── index.css            # Global CSS reset, typography, and formal fine-dining color variables
│   │
│   ├── assets/              # Static media assets
│   │   └── images/          # Photography assets (menu items, gallery imagery, chef headshot)
│   │
│   ├── components/          # Reusable presentation and utility components
│   │   ├── Navbar.jsx       # Global navigation bar linking all five primary routes
│   │   ├── Footer.jsx       # Global footer with hours, address, and newsletter subscription form
│   │   └── Modal.jsx        # Gallery lightbox modal supporting Escape-key and backdrop dismissal
│   │
│   └── pages/               # Primary page-level route components
│       ├── Home.jsx         # Landing page highlighting brand story, hours, and quick reservation link
│       ├── About.jsx        # History of Café Fausse and executive bios (Chef Lopez)
│       ├── Menu.jsx         # Structured dining menu (Starters, Main Courses, Desserts, Beverages)
│       ├── Gallery.jsx      # Interior and dining photo gallery wired to interactive modal
│       └── Reservations.jsx # Booking form with real-time validation and submission handling
│
└── server/                  # Backend service layer (Python / Flask)
    ├── app.py               # Flask application with REST API endpoints, CORS, and DB transactions
    ├── requirements.txt     # Python dependency manifest (Flask, psycopg2-binary, python-dotenv)
    └── schema.sql           # Normalized two-table PostgreSQL DDL (customers & reservations per FR-17)


##Database Architecture
The application implements a 3NF normalized schema in PostgreSQL consisting of two linked tables:

    customers Table
        customer_id (SERIAL PRIMARY KEY)

        customer_name (VARCHAR(150), NOT NULL)

        email_address (VARCHAR(255), UNIQUE NOT NULL)

        phone_number (VARCHAR(50), NULLABLE - optional per FR-6)

        newsletter_signup (BOOLEAN, DEFAULT FALSE)


    reservations Table
        reservation_id (SERIAL PRIMARY KEY)


        customer_id (INTEGER NOT NULL REFERENCES customers(customer_id) ON DELETE CASCADE)


        time_slot (VARCHAR(100), NOT NULL)


        table_number (INTEGER NOT NULL CHECK (table_number BETWEEN 1 AND 30))


##Local Setup & Installation
    1. Database Setup
    Ensure PostgreSQL is active and initialize the database schema in pgAdmin 4 or psql:
        CREATE DATABASE cafe_fausse;

    Execute the schema migration:
        CREATE TABLE customers (
            customer_id SERIAL PRIMARY KEY,
            customer_name VARCHAR(150) NOT NULL,
            email_address VARCHAR(255) UNIQUE NOT NULL,
            phone_number VARCHAR(50),
            newsletter_signup BOOLEAN DEFAULT FALSE
        );


        CREATE TABLE reservations (
            reservation_id SERIAL PRIMARY KEY,
            customer_id INTEGER NOT NULL REFERENCES customers(customer_id) ON DELETE CASCADE,
            time_slot VARCHAR(100) NOT NULL,
            table_number INTEGER NOT NULL CHECK (table_number BETWEEN 1 AND 30)
        );


    2. Backend API Setup
        cd server
        python -m venv venv
        .\venv\Scripts\activate
        pip install -r requirements.txt
        python app.py

        Backend runs on http://localhost:5000.

    3. Frontend Setup
        From the project root:
            npm install
            npm run dev

        Frontend runs on http://localhost:5173.

##Core Application Pages
    Home (/): Full branding, location details, telephone contact, hours, and restaurant image.


    About Us (/about): Restaurant origin narrative (founded 2010), founder bios for Chef Antonio Rossi and Maria Lopez with portrait assets, and the three core values.


    Menu (/menu): Categorized culinary offerings across Starters, Main Courses, Desserts, and Beverages, displaying exact items, descriptions, and pricing.


    Gallery (/gallery): Responsive grid of venue photos with interactive lightbox modal zoom and captions; critical review quotes; and awards won.


    Reservations (/reservations): Dynamic reservation engine validating party size, time slot, name, and email with optional phone number; automatically assigns random tables (1–30) and persists data to PostgreSQL.  Newsletter sign up form present as well.
