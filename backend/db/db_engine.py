from db_models import SQLModel
import os 
from sqlmodel import create_engine
from dotenv import load_dotenv
load_dotenv()

postgres = os.getenv("DB_URL")

engine = create_engine(postgres, echo=True)

if __name__ == "__main__":
    SQLModel.metadata.create_all(engine)