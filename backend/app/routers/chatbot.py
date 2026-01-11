from fastapi import APIRouter, Depends
from sqlmodel import Session, select, desc
from app.services.dialogflowService import detect_intent
from app.services.utils import get_current_user
from db.engine import engine
from db.models import ChatLogs

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

    # Log the interaction
    with Session(engine) as session:
        log = ChatLogs(
            user_id=user_id,
            question=question,
            response=result["response"],
            intent=result["intent"]
        )
        session.add(log)
        session.commit()

    return {
        "answer": result["response"],
        "intent": result["intent"],
        "confidence": result["confidence"]
    }

@router.get("/history")
async def get_history(user_id: str = Depends(get_current_user)):
    with Session(engine) as session:
        statement = select(ChatLogs).where(ChatLogs.user_id == user_id).order_by(desc(ChatLogs.timestamp))
        logs = session.exec(statement).all()
        
        return [
            {
                "question": log.question,
                "response": log.response,
                "intent": log.intent,
                "timestamp": log.timestamp
            } for log in logs
        ]

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
