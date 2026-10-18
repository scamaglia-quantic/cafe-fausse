## Project Overview

The Café Fausse website is a responsive, full-stack web application designed for a fine-dining restaurant. It is built with a React frontend, Flask RESTful API backend, and normalized PostgreSQL relational database.

## Design

- - **Architecture:** A decoupled three-part architecture: frontend (React), backend (Flask), and database (PostgreSQL), built using JavaScript and Python. The frontend sends reservation and newsletter data as JSON requests to the Flask backend, which runs the business logic to confirm a table is available, saves the records to PostgreSQL, and sends the result back to the frontend so the appropriate confirmation or error message can be shown to the customer.
- **Visual & UI Design:** Classic fine-dining aesthetic built with traditional CSS without external UI frameworks, using CSS Grid for the gallery and menu layouts, and Flexbox for the navigation bar, footer, and form alignment. High-contrast typography provides a bold, distinugished look.  Using images and texts in boxes that can be resized and moved, that is responsive, allow for adaptability to various screensizes.  Interactive imgage lightbox modality added per requirements to gallery page.  Headshots of owners added to About Us page to maintain the branding of the high-end, professional, and executive feel.  Otherwise, images were kept to a minimum to avoid any distractions or excess "noise" and allow the site to retain an upper-echelon feel.
- **Data Design:** Normalized two-table relational structure enforcing foreign key constraints and transactional integrity.

## Tech Stack

- **Frontend:** React 18, Vite, React Router DOM, Vanilla CSS (Flexbox & Grid)
- **Backend:** Python 3.14+, Flask, Flask-CORS, psycopg2-binary, python-dotenv
- **Database:** PostgreSQL (v18), pgAdmin 4
- **Development Tooling:** Gemini, Cursor IDE, npm, Python venv
- **Version Control:** Git

## Repository Tree

```text
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
│       ├── About.jsx        # History of Café Fausse and executive bios (Chef Antonio Rossi & Lopez)
│       ├── Menu.jsx         # Structured dining menu (Starters, Main Courses, Desserts, Beverages)
│       ├── Gallery.jsx      # Responsive grid of venue photos with interactive lightbox modal zoom and captions
│       └── Reservations.jsx # Booking form with real-time validation and submission handling
│
└── server/                  # Backend service layer (Python / Flask)
    ├── app.py               # Flask application with REST API endpoints, CORS, and DB transactions
    ├── requirements.txt     # Python dependency manifest (Flask, psycopg2-binary, python-dotenv)
    └── schema.sql           # Normalized two-table PostgreSQL DDL (customers & reservations per FR-17)
```

## Core Application Pages

- **Home (`/`):** Full branding, location details, telephone contact, hours, and restaurant image.
- **About Us (`/about`):** Restaurant origin narrative (founded 2010), founder bios for Chef Antonio Rossi and team.
- **Menu (`/menu`):** Categorized culinary offerings across Starters, Main Courses, Desserts, and Beverages, displaying descriptions and pricing.
- **Gallery (`/gallery`):** Responsive grid of venue photos with interactive lightbox modal zoom and captions; dismissible via backdrop click or Escape key.
- **Reservations (`/reservations`):** Dynamic reservation engine validating party size, time slot, name, and email, with optional phone number handling (FR-6) and random table assignment from 1 to 30.

## Database Architecture

The application implements a 3NF normalized schema in PostgreSQL consisting of two linked tables:

```sql
-- Customers Table
CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    customer_name VARCHAR(150) NOT NULL,
    email_address VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(50), -- optional per FR-6
    newsletter_signup BOOLEAN DEFAULT FALSE
);

-- Reservations Table
CREATE TABLE reservations (
    reservation_id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL REFERENCES customers(customer_id) ON DELETE CASCADE,
    time_slot VARCHAR(100) NOT NULL,
    table_number INTEGER NOT NULL CHECK (table_number BETWEEN 1 AND 30)
);
```

## Local Setup & Installation

### 1. Database Setup
Ensure PostgreSQL is active and initialize the database schema in pgAdmin 4 or psql:
```sql
CREATE DATABASE cafe_fausse;
```
Execute the schema migration using the SQL definitions above or run `server/schema.sql`.

### 2. Backend API Setup
From the project root:
```powershell
cd server
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
python app.py
```
Backend runs on `http://localhost:5000`.

### 3. Frontend
From the project root in a separate terminal:
```powershell
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`. 