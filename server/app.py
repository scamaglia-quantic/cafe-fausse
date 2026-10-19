import os
import random
import psycopg2
from psycopg2.extras import RealDictCursor
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

CAPACITY_TABLE_LIMIT = 30

DB_HOST = os.getenv("DB_HOST", "localhost")
DB_NAME = os.getenv("DB_NAME", "cafe_fausse")
DB_USER = os.getenv("DB_USER", "postgres")
DB_PASSWORD = os.getenv("DB_PASSWORD", "postgres")
DB_PORT = os.getenv("DB_PORT", "5432")


def get_db_connection():
    return psycopg2.connect(
        host=DB_HOST,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
        port=DB_PORT,
    )


@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({"status": "healthy", "service": "Cafe Fausse API"}), 200


@app.route("/api/reservations", methods=["POST"])
def create_reservation():
    data = request.get_json() or {}

    # FR-6 Form Fields
    customer_name = data.get("fullName", "").strip()
    email_address = data.get("email", "").strip().lower()
    phone_number = data.get("phone")
    if phone_number:
        phone_number = phone_number.strip() or None
    else:
        phone_number = None

    date = data.get("date", "").strip()
    time = data.get("time", "").strip()
    guests = data.get("guests")

    # Validation: Phone is optional, all others required
    if not all([customer_name, email_address, date, time, guests]):
        return jsonify({"error": "Missing required reservation fields."}), 400

    # Format the single Time Slot string required by FR-17
    time_slot = f"{date} {time}"

    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)

        # FR-7: Validate capacity for the selected time slot
        cur.execute(
            """
            SELECT table_number 
            FROM reservations 
            WHERE time_slot = %s;
            """,
            (time_slot,),
        )
        booked_rows = cur.fetchall()
        booked_tables = {row["table_number"] for row in booked_rows}

        # FR-9: Return error if fully booked (all 30 tables taken)
        if len(booked_tables) >= CAPACITY_TABLE_LIMIT:
            cur.close()
            return jsonify({
                "error": f"Time slot {time_slot} is fully booked. All 30 tables are reserved."
            }), 409

        # FR-8: Assign a random table from the remaining available tables (1 to 30)
        available_tables = [t for t in range(1, CAPACITY_TABLE_LIMIT + 1) if t not in booked_tables]
        assigned_table = random.choice(available_tables)

        # FR-17: Customers Table (Customer ID, Customer Name, Email Address, Phone Number, Newsletter Signup)
        cur.execute(
            """
            SELECT customer_id FROM customers WHERE email_address = %s;
            """,
            (email_address,),
        )
        existing_customer = cur.fetchone()

        if existing_customer:
            customer_id = existing_customer["customer_id"]
            if phone_number:
                cur.execute(
                    """
                    UPDATE customers 
                    SET customer_name = %s, phone_number = %s 
                    WHERE customer_id = %s;
                    """,
                    (customer_name, phone_number, customer_id),
                )
            else:
                cur.execute(
                    """
                    UPDATE customers 
                    SET customer_name = %s 
                    WHERE customer_id = %s;
                    """,
                    (customer_name, customer_id),
                )
        else:
            cur.execute(
                """
                INSERT INTO customers (customer_name, email_address, phone_number, newsletter_signup)
                VALUES (%s, %s, %s, FALSE)
                RETURNING customer_id;
                """,
                (customer_name, email_address, phone_number),
            )
            customer_id = cur.fetchone()["customer_id"]

        # FR-17: Reservations Table (Reservation ID, Customer ID, Time Slot, Table Number)
        cur.execute(
            """
            INSERT INTO reservations (customer_id, time_slot, table_number)
            VALUES (%s, %s, %s)
            RETURNING reservation_id;
            """,
            (customer_id, time_slot, assigned_table),
        )
        reservation_id = cur.fetchone()["reservation_id"]

        conn.commit()
        cur.close()

        # FR-9: Display success message and details
        return jsonify({
            "message": "Reservation confirmed.",
            "reservationId": reservation_id,
            "table_number": assigned_table,
            "tableNumber": assigned_table,
            "details": {
                "name": customer_name,
                "email": email_address,
                "phone": phone_number,
                "timeSlot": time_slot,
                "tableNumber": assigned_table,
                "guests": guests,
            },
        }), 201

    except Exception as e:
        if conn:
            conn.rollback()
        return jsonify({"error": f"Internal database error: {str(e)}"}), 500
    finally:
        if conn:
            conn.close()


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)