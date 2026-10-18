import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import psycopg2
from psycopg2.extras import RealDictCursor

# Load environment variables from .env
load_dotenv()

app = Flask(__name__)
CORS(app)

CAPACITY_TABLE_LIMIT = 30

def get_db_connection():
    return psycopg2.connect(
        dbname=os.getenv("DB_NAME", "cafe_fausse"),
        user=os.getenv("DB_USER", "postgres"),
        password=os.getenv("DB_PASSWORD", "LexiLiz1122!!"),
        host=os.getenv("DB_HOST", "localhost"),
        port=os.getenv("DB_PORT", "5432")
    )

@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({"status": "healthy"}), 200

@app.route("/api/newsletter", methods=["POST"])
def subscribe_newsletter():
    data = request.get_json() or {}
    email = data.get("email", "").strip().lower()

    if not email or "@" not in email:
        return jsonify({"error": "A valid email address is required."}), 400

    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO newsletter_subscribers (email) VALUES (%s) RETURNING id;",
            (email,)
        )
        conn.commit()
        cur.close()
        return jsonify({"message": "Successfully subscribed to the newsletter."}), 201
    except psycopg2.IntegrityError:
        if conn:
            conn.rollback()
        return jsonify({"message": "This email is already subscribed."}), 200
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
    email = data.get("email", "").strip()
    phone = data.get("phone", "").strip()
    date = data.get("date", "").strip()
    time = data.get("time", "").strip()
    guests = data.get("guests")
    special_requests = data.get("specialRequests", "").strip()

    if not all([full_name, email, phone, date, time, guests]):
        return jsonify({"error": "Missing required reservation fields."}), 400

    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)

        # 30-Table Capacity Check for the requested date and time
        cur.execute(
            """
            SELECT COUNT(*) AS total_booked
            FROM reservations
            WHERE reservation_date = %s AND reservation_time = %s;
            """,
            (date, time)
        )
        row = cur.fetchone()
        current_booked = row["total_booked"] if row else 0

        if current_booked >= CAPACITY_TABLE_LIMIT:
            cur.close()
            return jsonify({
                "error": f"Fully booked. Maximum capacity of {CAPACITY_TABLE_LIMIT} tables reached for this time slot."
            }), 409

        # Insert reservation record
        cur.execute(
            """
            INSERT INTO reservations (full_name, email, phone, reservation_date, reservation_time, guests, special_requests)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            RETURNING id;
            """,
            (full_name, email, phone, date, time, int(guests), special_requests)
        )
        res_id = cur.fetchone()["id"]
        conn.commit()
        cur.close()

        return jsonify({
            "message": "Reservation confirmed.",
            "reservationId": res_id,
            "details": {
                "name": full_name,
                "date": date,
                "time": time,
                "guests": guests
            }
        }), 201

    except Exception as e:
        if conn:
            conn.rollback()
        return jsonify({"error": f"Database error: {str(e)}"}), 500
    finally:
        if conn:
            conn.close()

if __name__ == "__main__":
    app.run(port=5000, debug=True)