from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

SQLITE_URL_DATABASE = "sqlite:///products.db"

engine = create_engine(SQLITE_URL_DATABASE, connect_args={"check_same_thread": False})

session = sessionmaker(bind=engine, autoflush=False)

def get_db():
    db = session()
    try: 
        yield db
    finally:
        db.close()