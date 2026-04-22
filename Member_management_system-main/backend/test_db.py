import sys
from pathlib import Path

# Add the backend directory to the path to allow imports from main
sys.path.append(str(Path(__file__).parent.absolute()))

from sqlalchemy import create_engine
from main import Base, settings  # Import Base and settings from main.py

def create_tables():
    """
    Connects to the database and creates all tables defined in the models.
    """
    try:
        print(f"Connecting to database with URL: {settings.database_url}")
        engine = create_engine(settings.database_url)
        
        print("Creating tables...")
        # The UserModel and MemberModel are linked to this Base metadata
        Base.metadata.create_all(bind=engine)
        
        print("Tables created successfully!")
        
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    create_tables()
