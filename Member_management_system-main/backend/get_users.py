from sqlalchemy import create_engine, text
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)

with engine.connect() as connection:
    # Check for specific email
    email_to_check = 'viruthika.radhika@gmail.com'
    result = connection.execute(text(f"SELECT id, email, created_at FROM users WHERE email = '{email_to_check}'"))
    user = result.fetchone()
    
    if user:
        print(f"User found: ID={user[0]}, Email={user[1]}, Created At={user[2]}")
    else:
        print(f"{email_to_check} NOT found in database")
    
    # Show all users
    print("\nAll users in database:")
    print("-" * 50)
    result = connection.execute(text("SELECT id, email, created_at FROM users"))
    users = result.fetchall()
    for user in users:
        print(f"ID: {user[0]}, Email: {user[1]}, Created At: {user[2]}")
        print("-" * 50)
