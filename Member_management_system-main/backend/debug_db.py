import sys
from pathlib import Path
sys.path.append(str(Path(__file__).parent.absolute()))

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from main import UserModel, Base, settings, get_password_hash

def debug_database():
    """
    Debug database operations to identify why data isn't being stored
    """
    try:
        print("Creating database engine...")
        engine = create_engine(settings.database_url)
        
        print("Creating session...")
        SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
        db = SessionLocal()
        
        print("Testing user creation...")
        # Check if user already exists
        existing_user = db.query(UserModel).filter(UserModel.email == "debug@example.com").first()
        if existing_user:
            print(f"User already exists: {existing_user.email}")
        else:
            # Create test user
            hashed_password = get_password_hash("testpass123")
            new_user = UserModel(email="debug@example.com", password=hashed_password)
            print(f"Adding user: {new_user.email}")
            
            db.add(new_user)
            print("User added to session")
            
            db.commit()
            print("Transaction committed")
            
            db.refresh(new_user)
            print(f"User created with ID: {new_user.id}")
        
        # Query all users
        all_users = db.query(UserModel).all()
        print(f"Total users in database: {len(all_users)}")
        for user in all_users:
            print(f"  - {user.email} (ID: {user.id})")
        
        db.close()
        print("Database session closed")
        
    except Exception as e:
        print(f"Error occurred: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    debug_database()
