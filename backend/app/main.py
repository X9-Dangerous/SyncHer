from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import chatbot, register, login
from dotenv import load_dotenv
from db.engine import engine, text
from db.models import SQLModel

load_dotenv()

app = FastAPI(name="SyncHer")

@app.on_event("startup")
def on_startup():
    with engine.connect() as conn:
        conn.execute(text('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'))
        conn.commit()
    SQLModel.metadata.create_all(engine)

# CORS Configuration
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chatbot.router)
app.include_router(register.router)
app.include_router(login.router)
