from fastapi import APIRouter, Depends
from app.services.dialogflowService import detect_intent
from app.services.utils import get_current_user

router = APIRouter(
    prefix="/chatbot",  # all routes here will start with /chatbot
    tags=["Chatbot"]
)
#This file is to show how we will handle the other endpoints, for instance, the full endpoint for the route below will be: http://127.0.0.1:8000/chatbot/ask
@router.post("/ask")
async def ask_question(payload: dict,
    user_id: str = Depends(get_current_user),
    ):
    question = payload.get("question")
    session_id = payload.get("session_id")
    if not question:
        return{"error": "A question is required"}

    result = detect_intent(question, session_id)

    return {
        "answer": result["response"],
        "intent": result["intent"],
        "confidence": result["confidence"]
    }

@router.post("/guest/ask")
async def ask_guest_question(payload: dict):
    question = payload.get("question")
    session_id = payload.get("session_id")
    if not question:
        return {"error": "A question is required"}

    result = detect_intent(question, session_id)

    return {
        "answer": result["response"],
        "intent": result["intent"],
        "confidence": result["confidence"]
    }


@router.get("/health")
async def health_check():
    return {"status": "chatbot router working"}
