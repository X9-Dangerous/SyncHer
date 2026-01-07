from fastapi import FastAPI
from app.routers.chatbot import router
from dotenv import load_dotenv
load_dotenv()

app = FastAPI(name="SyncHer")

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