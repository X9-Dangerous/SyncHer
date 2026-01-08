from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.chatbot import router
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(name="SyncHer")

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

app.include_router(router)

# @app.post("")
# async def register():
#     pass

# @app.post("")
# async def login():
#     pass

# @app.post("")
# async def period_tracking():
#     pass