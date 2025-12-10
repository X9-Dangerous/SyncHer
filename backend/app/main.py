from fastapi import FastAPI
from .routers import chatbot  

app = FastAPI(title="syncHer API")  

app.include_router(chatbot.router)

@app.get("/")
async def root():
    return {"status": "Backend is up, bravo!!"}
