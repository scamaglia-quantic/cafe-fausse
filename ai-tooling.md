1. Project Overview
The purpose of this project is to make a functional, interactive website for a high-end French restaurant named Café Fausse’s.  The website should allow for an interactive, integrated reservation system that prevents overbooking and the ability for clients to sign up for a newsletter. The main page should include not only the restaurant’s name, but the contact information and restaurant hours. The About Us page should explain the restaurant’s history, mission, and provide profiles of the two owners.  The Gallery Page should highlight images of the restaurant and food as well as awards and top reviews.  The site should be easy to navigate through usual navigational links.  

The frontend, backend, and database should be created and functional with the use of Flask and React.

2. Technology Stack

Programming language(s): Python, Javascript, JSX, HTML, CSS, SQL
IDE: Cursor
Framework(s) [including microframeworks] & Libraries: Flask (backend), React (frontend)
Database: PostgreSQL
Other tools: Vite, PgAdmin4, Gemini AI, Cursor AI

3. Development Environment
Operating system: Windows

Required software and versions (those utilized, may be able to use other versions):
    Core Runtimes & Server Engines:
    **Node.js:** v24.21.0 — Frontend JavaScript runtime environment
    **npm:** 11.19.0 — Node package manager
    **Python:** 3.14.6 — Backend runtime environment
    **PostgreSQL:** 18.6 (64-bit Windows) — Relational database server
    **pgAdmin 4:** v9.17 — Database administration GUI interface

    Primary Frameworks & Libraries:
    **React:** ^18.x — Frontend user interface library
    **Vite:** ^5.x (or ^6.x) — Development server and production build tool
    **Flask:** ^3.x — Backend Python REST API framework
    **psycopg2-binary:** ^2.9.x — PostgreSQL database adapter for Python
    **Flask-CORS:** ^4.x — Cross-Origin Resource Sharing middleware

Installation instructions: 

1. Database Setup
Launch **pgAdmin 4** and connect to your local PostgreSQL server.

Create a new database named `cafe_fausse`.

Open the **Query Tool** for `cafe_fausse` and execute the schema script to  create the `customers` and `reservations` tables:

   ```sql
   CREATE TABLE customers (
       customer_id SERIAL PRIMARY KEY,
       customer_name VARCHAR(100) NOT NULL,
       customer_email VARCHAR(100) NOT NULL,
       customer_phone VARCHAR(20)
   );

   CREATE TABLE reservations (
       reservation_id SERIAL PRIMARY KEY,
       customer_id INT REFERENCES customers(customer_id) ON DELETE CASCADE,
       time_slot VARCHAR(50) NOT NULL,
       Num_guests INT NOT NULL,
       table_number INT NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

2. Backend Setup (Flask API)
Navigate to the backend directory in the powershell:
 cd server 

Create and activate a a Python virtual environment in the powershell: 
python -m venv venv
.\venv\Scripts\activate

Install Required Packages
pip install flask flask-cors psycopg2-binary python-dotenv

Prepare FIle for the Server Code
Create a .env file in /server with your PostgreSQL credentials
		
		DB_NAME=cafe_fausse
        DB_USER=postgres
        DB_PASSWORD=your_password
        DB_HOST=localhost
        DB_PORT=5432

 Start the backend server
		In the powershell run: python app.py
		
The API will start locally on http://localhost:5000. 

3. Frontend Setup (React + Vile)
Open a second terminal in the project root terminal to do the following steps.

Install project dependencies by going to the PowerShell and running: npm install

Start the local Vite development server by going to the PowerShell and running: npm run dev

Open browser to Open your browser to http://localhost:5173 to access the application

4. Coding Standards
Summarized Retrospective:
    General Coding Standards
        Write direct, efficient, readable, and maintainable code.
        Use descriptive and specific names for variables, functions, classes, and components.
        Follow established coding conventions for each programming language and framework.
        Add comments to explain complex logic and important implementation decisions.
        Preserve all existing functionality unless a change is explicitly required. When a change is required, explain it.
        Do not introduce unnecessary dependencies or technologies.

    Front-End Standards
        Use React with JSX for all front-end components.
        Build reusable components for common interface elements with React.
        Use CSS Flexbox or CSS Grid to implement responsive layouts, ensuring usability on desktop, laptop, tablet, and mobile devices.
        Maintain a consistent visual identity appropriate for a fine-dining restaurant.
        Provide clear navigation between the Home, Menu, Reservations, About Us, and Gallery pages.
        Display clear, user-friendly error and success messages.
        Implement the Gallery lightbox feature for enlarged image viewing.

    Back-End Standards
        Use Python and Flask to implement the back-end API.
        Organize codes, logic, routes and database operations into appropriate modules.
        Implement RESTful API endpoints for reservation processing and newsletter subscriptions.
        Validate all incoming requests on the server.
        Maintain data security consistent with industry standards.

    Database Standards
        Use PostgreSQL for persistent storage.
        Implement the Customers and Reservations tables according to the project requirements.
        Customer table should consistent of the following rows:
            Customer ID
            Customer Name
            Email Address
            Phone Number
            Newsletter Signup
        Reservation table should consistent of the following rows:
            Reservation ID
            Customer ID
            Time Slot
            Table Number 
        Use primary keys, foreign keys, appropriate data types, and database constraints per project requirements.
        Use database transactions where needed to preserve data integrity, ideally up to 3NF.
        Prevent duplicate table assignments for overlapping reservations through appropriate database constraints and transaction-safe reservation logic.
        Store customer information and newsletter subscriptions consistently and accurately.
        Do not allow duplicate email listings for newsletter subscriptions.

    Reservation System Standards
        Support a maximum of 30 restaurant tables.
        Validate the requested reservation date, time, and number of guests.
        Validate email is in the appropriate format.
        Maintain phone number as optional and, when entered, ensure at least 10 digits but allow for parentheses, dashes, and spaces.
        Use Flask logic to
            Insert new customer records into the database from the reservation form and/or newsletter sign up form.
            If data comes from the reservation form, then
                Check table availability for the selected time slot 
                Assign a random table (from 30 available) if available
                Prevent double bookings and overbooking when multiple customers submit reservations simultaneously.
                Return confirmation or error messages to the user. 
            Do not report a reservation as confirmed until the database transaction succeeds.

Security and Privacy Standards
    Never save passwords or personal data to Github
    Protect customer names, email addresses, phone numbers, and reservation details.
    Use HTTPS in production.
    Apply appropriate access controls to administrative functions and customer information.
    Use other industry standard practices to secure data and the website.

Performance and Compatibility Standards
    Optimize page elements/code to meet the three-second page-load target.
    Maintain efficient database queries and application logic so reservation and newsletter submissions are processed within two seconds under normal conditions.
    Ensure compatibility with Chrome, Firefox, Safari, and Edge.
    Avoid unnecessary queries or other processes that may slow loading times or worsen performance.

Testing and Documentation Standards
    Test front-end components, Flask API endpoints, and database operations with human-in-the-loop verification before moving onto the next step.
    Test successful reservations, unavailable time slots, invalid form submissions, and simultaneous booking attempts with human-in-the-loop verification before moving onto the next step.
    Verify that newsletter email addresses are validated and stored correctly with human-in-the-loop verification before moving onto the next step.
    Test that new changes do not break existing functionality.
    Keep the code and documentation consistent with the approved project requirements on GitHub.

Project Requirement Compliance
    Treat the approved Café Fausse project specifications as the source of truth for required functionality.
    Implement all specified functional and non-functional requirements.
    Do not remove, omit, or replace required features without explicit authorization.
    Identify any conflicts, ambiguities, or missing requirements before making assumptions that affect functionality.
    Do not add major features outside the approved scope without approval.

More Realistc Reflection:
I had an extremely long 2-week long chat with Gemini.  I asked it to honestly summarize my prompts during this project as it would be near impossible to review and summarize now on my own (especially without implicit/subconscious bias).  This is output to my prompt:

    Gemini (Architecture, Strategy & Core Implementation):   as technical mentor, assistant system architect, and primary code author. Conducted brand requirements analysis to confirm initial inputs, generated AI assets for team profiles, authored core React components, and wrote 100% of the Menu page logic, the entire Flask backend API, and all PostgreSQL database schemas.

    Cursor AI & IDE Environment: Served as the local code staging, editing, and execution workspace. Facilitated file placement, local script execution, hot-reloading development servers, and Git version control tracking.
    
    Human Engineering & Oversight: Directed system requirements, evaluated software architecture decisions, verified requirements compliance (e.g., FR-17 two-table database normalization and FR-6 optional phone validation), executed database operations in pgAdmin 4, and performed manual end-to-end testing across both client and server runtimes.
    
    Phase-by-Phase Technical Progression
        Phase 1: Brand Concept, Image Assets & Frontend Architecture
            Gemini Collaboration: Analyzed project specifications to define the traditional, formal fine-dining visual identity for Café Fausse.  [N.B. this was more picking out the specific Hex of the colors from my input of the branding vibes, etc].  Generated professional AI headshot imagery (including Chef Lopez) for team bios on the About Us page {N.B. per my prompt]. Explained foundational React concepts (JSX syntax, component hierarchies, state-driven rendering) and provided initial React scaffolding and page routing structures across the five core views: Home, About Us, Menu, Gallery, and Reservations.
            
            Cursor & Workspace Execution: Staged components into /src/components and /src/pages.Managed dependencies and launched the frontend via Vite (npm run dev) on http://localhost:5173. Resolved local relative asset paths and directory references. 
            
            Human Oversight & Verification: Enforced the use of native Vanilla CSS (Flexbox and Grid) over third-party UI widget libraries. Audited semantic HTML and responsive layouts across desktop, tablet, and mobile breakpoints.

        Phase 2: Menu Implementation & Dynamic Lightbox Modal
            Gemini Collaboration: Authored 100% of the code for the Menu page, organizing data structures for Starters, Main Courses, Desserts, and Beverages, and generating responsive display cards with accurate pricing. Authored the full lightbox modal component in Gallery.jsx, utilizing React hooks (useState, useEffect) to capture backdrop click events and attach a global keydown event listener for the Escape key.
            
            Cursor & Workspace Execution: Integrated generated code directly into the component tree. Validated image asset bindings and checked browser console logs for rendering performance.
            
            Human Oversight & Verification: Tested the interactive gallery modal in the browser to ensure clicking thumbnail images opened the enlarged view and that backdrop/Escape triggers dismissed the overlay properly.
            
        Phase 3: Backend REST API & Relational Database Construction
            Gemini Collaboration: Authored 100% of the database architecture: Wrote the PostgreSQL DDL schema scripts establishing normalized customers and reservations tables linked via foreign key constraints, strictly satisfying specification FR-17. Authored 100% of the backend codebase: Developed server/app.py using Flask, implementing REST endpoints (/api/reservations, newsletter routes), parameter-safe SQL execution via psycopg2, random table assignment logic (tables 1–30), and database transaction rollbacks. Requirements Realignment: Corrected phone number validation per FR-6 to be completely optional, while ensuring that if provided, input contains at least 10 digits while permitting standard formatting (parentheses, spaces, hyphens).

            Cursor & Workspace Execution: Configured the Python virtual environment (python -m venv venv) and installed backend dependencies (pip install). Structured environment variables within .env and executed the server on http://localhost:5000.

            Human Oversight & Verification: Because psql was not registered in the system environment PATH, all SQL schemas and table verifications were executed manually using the pgAdmin 4 Query Tool. Validated live data records across foreign key relationships, confirmed table number randomness, and verified error-handling for unavailable slots.

        Phase 4: Technical Stack Classification, Documentation & Staging
            Gemini Collaboration: Clarified technical classifications: cataloging Python, JavaScript, HTML, CSS, and SQL as programming/query languages; Flask as a backend framework; React as a frontend UI library; and PostgreSQL as a relational database management system. Documented verified local development environment versions: Node.js v24.21.0, npm 11.19.0, Python 3.14.6, PostgreSQL 18.6, and pgAdmin 4 v9.17.

            Cursor & Workspace Execution: Staged all technical markdown documents (README.md, staging.md, ai-tooling.md) directly in the workspace. Ran Git staging, commits, and pushes to finalize the submission repository.

5. AI Tool Usage
Initially, per the advice of the project guide, feed the project/software requirements to Gemini AI as my assistant, but felt the output essentially completed the entire project at once by providing all the coding and instructions in one large output -- I wanted to learn more step by step.

I took a different approach used Cursor’s built in AI tool to code, with some assistance from Gemini to learn how to use Cursor AI.  Ran into a challenge when I ran out of tokens and was asked to pay for a pro model.

At this point I went back to Gemini, but it instructed it to go slower, more step by step, in generating code and building the website.

What worked well:
    I could ask Gemini questions about the code, the process, and how/why we did certain things at each step so I could both code and learn in the same interface.

    I could confirm I was taking the correction action by taking screenshots and sharing them with Gemini.  Likewise, if something went wrong, not only could I describe it to Gemini, I could share a screenshot as well. This was very helpful when I ran into tech glitches I would not have otherwise known how to handle, like when my client terminal auto-shut down overnight and I was unaware of that.

What did not work well:
    Some details in the requirements were missed by Gemini, so human-in-the-loop verification was an absolute must (as it is in my opinion with most/all AI use cases) before moving onto the next step.  These were not frank errors, but would have resulted in a suboptimal product and some missed requirements if not caught.  Some examples include:
        Not creating a customer ID in the database.
        Not making the phone number optional on the reservation phone, nor having any verification of the format if it was entered.
        Redundancy of restaurant information on the main page between the body and the footer.
        Retaining placeholder information instead of including the specific restaurant address, phone number, menu items, etc.
    
    Initial difficulties with Cursor finding the path to pgAdmin4 and PSQL. Gemini was very helpful in walking me commands to determine the path and thereby allow the connection.

6. Testing and Quality Assurance
While formal automated unit testing suites were outside the initial scope of this build, manual integration and verification testing was conducted throughout the build, including:

    Frontend Verification
        Tested navigation ability on the client side through all 5 pages to ensure uninterrupted page state
        Confirmed that clicking any gallery thumbnail opens the high-resolution overlay
     Form Validation & Input Handling
        Reservation form input
            Ensured all expected inputs were present
            Ensured phone number input was optional and other inputs were required.
            Tested submission boundaries for guest count, valid reservation dates, and time slot selections.
            Confirmed that invalid email syntax is rejected
            Confirmed phone number, if entered, was validated for for at least 10 digits while permitting standard formatting (spaces, hyphens, parentheses).
            Confirmed positive message of accepted reservation.
            Confirmed proper messaging if timeslot filled.
        Newsletter subscription
            Confirmed positive messaged of accepted reservation
            Confirmed invalid email syntax rejected
    Backend API & Database Integrity    
        Endpoint Response Codes
            Verified REST API endpoints (`/api/reservations` and newsletter routes) in Flask, confirming `200/201` status responses on successful payloads and `400/500` error handling on invalid submissions.
        Relational Data Persistence (FR-17):
            Inspected the PostgreSQL database directly via the pgAdmin 4 Query Tool to confirm that confirmed reservations properly insert linked records into both `customers` and `reservations` tables using foreign key constraints.
        Table Allocation Logic: Verified that confirmed bookings receive a randomly assigned table number within the 1–30 dining room capacity limit.

7. Security and Privacy
Data Privacy:
    Database credentials (usernames, passwords, hosts, ports) are stored in an unversioned `.env` file within the `/server` directory and loaded via Python environment packages only locally.
    
    Git Shielding: The repository includes a configured `.gitignore` file to ensure local secrets (`.env`), Python virtual environments (`venv/`), dependency artifacts (`node_modules/`), and temporary cache directories (`__pycache__/`) are never committed to public source control.
        Customer names, emails, and optional phone numbers are restricted to required reservation handling and newsletter storage, avoiding exposure in client-facing queries.

    All user inputs are sanitized and validated on both the client (React) and server (Flask) runtimes before interacting with the database layer.

Controlled API access: 
    Flask uses `flask-cors` middleware to explicitly manage incoming cross-origin requests from the Vite frontend development server (`http://localhost:5173`), preventing unauthorized cross-site domain traffic.

Additional safety guardrails for security and privacy per AI coding (that I honestly do not 100% understand but am placing here for thoroughness):
    All communication with the PostgreSQL database via `psycopg2` utilizes parameterized SQL queries rather than raw string concatenation, mitigating standard SQL injection risks.
    Multi-table operations across `customers` and `reservations` run within explicit transactions (`conn.commit()`) with error rollbacks (`conn.rollback()`), preventing partial data corruption or orphaned records.

8. Documentation
Full project source code, version history, and supplementary design logs are maintained in the GitHub repository:  https://github.com/scamaglia-quantic/cafe-fausse 

Documentation Index:
    README.md: explains what the project is, what it does, and how to install and run it 
    
    ai-tooling.md:  Comprehensive record of the AI-human collaborative workflow, technical governance, requirements enforcement (FR-6, FR-17), and tooling division between Gemini and Cursor.

    staging.md:  Technical environment specifications, dependency rosters, and implementation staging checklists.

9. Version Control
The source code, database scripts, and technical documentation for this project are versioned using Git and hosted on GitHub.
https://github.com/scamaglia-quantic/cafe-fausse 

Changes were committed incrementally at key project milestones and as needed at the end of large work blocks before powering down.

A `.gitignore` file in the root directory ensures local environment files (`.env`), Python virtual environments (`venv/`), dependencies (`node_modules/`), and cache files remain private and are not pushed to the public repository.  This protects private information, such as client data or my PSQL password.


10. Project-Specific Instructions
Per the grading rubric:
    The minimum five pages of the Web site have been built using React and JSX. 
    All of the requirements requested in the SRS have been implemented. 
    The Web site maintains good appearance and evidences excellent UI and UX design.
    Appropriate use of Flexbox or Grid approaches has been made to achieve a high quality UX 
    Where forms are needed to meet user requirements, these have been correctly implemented and are working. 
    A back-end Flask app and database correctly integrated with the React front-end and meeting the requirements for the reservation and newsletter signup system. 
    The demo presentation presents all required elements, including the correct effect of reservations and newsletter signups on the backend database and sophisticated reservations logic .
    A document outlines what AI code generation tools have been used and how. 
