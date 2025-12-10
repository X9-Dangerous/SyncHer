from fastapi import APIRouter

router = APIRouter(
    prefix="/chatbot",  # all routes here will start with /chatbot
    tags=["Chatbot"]
)
#This file is to show how we will handle the other endpoints, for instance, the full endpoint for the route below will be: http://127.0.0.1:8000/chatbot/ask
@router.post("/ask")
async def ask_question(payload: dict):
    question = payload.get("question")
    # Replace this with actual AI call
    return {"response": f"You asked: {question}"}

@router.get("/health")
async def health_check():
    return {"status": "chatbot router working"}
