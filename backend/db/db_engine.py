from db.db_models import SQLModel
from dotenv import load_dotenv
import os
from sqlmodel import create_engine

load_dotenv()

postgres = os.getenv("DB_URL")

engine = create_engine(postgres, echo=True)


def create_tables(engine=engine):
    SQLModel.metadata.create_all(engine)


if __name__ == "__main__":
    create_tables()
