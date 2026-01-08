from db.models import SQLModel
import os 
from sqlmodel import create_engine
from dotenv import load_dotenv
load_dotenv()

postgres = os.getenv("DB_URL")

engine = create_engine(postgres, echo=True)

from sqlalchemy import text

if __name__ == "__main__":
    with engine.connect() as conn:
        conn.execute(text('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'))
        conn.commit()
    SQLModel.metadata.create_all(engine)