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


@app.route("/api/newsletter", methods=["POST"])
def newsletter_signup():
    data = request.get_json() or {}
    email = data.get("email", "").strip().lower()

    if not email or "@" not in email:
        return jsonify({"error": "A valid email address is required."}), 400

    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)

        cur.execute("SELECT customer_id FROM customers WHERE email_address = %s;", (email,))
        existing = cur.fetchone()

        if existing:
            cur.execute(
                "UPDATE customers SET newsletter_signup = TRUE WHERE email_address = %s;",
                (email,),
            )
        else:
            cur.execute(
                """
                INSERT INTO customers (customer_name, email_address, phone_number, newsletter_signup)
                VALUES (%s, %s, NULL, TRUE);
                """,
                ("Newsletter Subscriber", email),
            )

        conn.commit()
        cur.close()
        return jsonify({"message": "Successfully subscribed to newsletter."}), 201

    except Exception as e:
        if conn:
            conn.rollback()
        return jsonify({"error": f"Database error: {str(e)}"}), 500
    finally:
        if conn:
            conn.close()


@app.route("/api/reservations", methods=["POST"])
def create_reservation():
    data = request.get_json() or {}

    full_name = data.get("fullName", "").strip()
    email = data.get("email", "").strip().lower()
    phone = data.get("phone")
    if phone:
        phone = phone.strip() or None
    else:
        phone = None

    date = data.get("date", "").strip()
    time = data.get("time", "").strip()
    guests = data.get("guests")

    # Validate required fields (phone is strictly optional)
    if not all([full_name, email, date, time, guests]):
        return jsonify({"error": "Missing required reservation fields."}), 400

    # Combine date and time into the FR-17 time_slot column
    time_slot = f"{date} {time}"

    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)

        # 1. Check existing booked tables for this time slot
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

        if len(booked_tables) >= CAPACITY_TABLE_LIMIT:
            cur.close()
            return jsonify({
                "error": f"Fully booked. Maximum capacity of {CAPACITY_TABLE_LIMIT} tables reached for this time slot."
            }), 409

        # 2. Select an available table (1 to 30)
        available_tables = [t for t in range(1, CAPACITY_TABLE_LIMIT + 1) if t not in booked_tables]
        assigned_table = random.choice(available_tables)

        # 3. Upsert customer into the customers table
        cur.execute("SELECT customer_id FROM customers WHERE email_address = %s;", (email,))
        customer_row = cur.fetchone()

        if customer_row:
            cust_id = customer_row["customer_id"]
            if phone:
                cur.execute(
                    "UPDATE customers SET customer_name = %s, phone_number = %s WHERE customer_id = %s;",
                    (full_name, phone, cust_id),
                )
            else:
                cur.execute(
                    "UPDATE customers SET customer_name = %s WHERE customer_id = %s;",
                    (full_name, cust_id),
                )
        else:
            cur.execute(
                """
                INSERT INTO customers (customer_name, email_address, phone_number, newsletter_signup)
                VALUES (%s, %s, %s, FALSE)
                RETURNING customer_id;
                """,
                (full_name, email, phone),
            )
            cust_id = cur.fetchone()["customer_id"]

        # 4. Insert into the reservations table using time_slot
        cur.execute(
            """
            INSERT INTO reservations (customer_id, time_slot, table_number)
            VALUES (%s, %s, %s)
            RETURNING reservation_id;
            """,
            (cust_id, time_slot, assigned_table),
        )
        res_id = cur.fetchone()["reservation_id"]

        conn.commit()
        cur.close()

        return jsonify({
            "message": "Reservation confirmed.",
            "reservationId": res_id,
            "table_number": assigned_table,
            "tableNumber": assigned_table,
            "details": {
                "name": full_name,
                "email": email,
                "phone": phone,
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