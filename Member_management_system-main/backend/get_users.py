from sqlalchemy import create_engine, text
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)

with engine.connect() as connection:
    # Check for specific email
    result = connection.execute(text("SELECT id, email, created_at FROM users WHERE email = 'hp@gmail.com'"))
    user = result.fetchone()
    
    if user:
        print(f"User found: ID={user[0]}, Email={user[1]}, Created At={user[2]}")
    else:
        print("hp@gmail.com NOT found in database")
    
    # Show all users
    print("\nAll users in database:")
    print("-" * 50)
    result = connection.execute(text("SELECT id, email, created_at FROM users"))
    users = result.fetchall()
    for user in users:
        print(f"ID: {user[0]}, Email: {user[1]}, Created At: {user[2]}")
        print("-" * 50)
