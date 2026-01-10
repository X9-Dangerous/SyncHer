from datetime import datetime
from db.db_models import Chat, Message
from db.db_engine import engine
from dotenv import load_dotenv
from fastapi import APIRouter, Request, HTTPException
from google.oauth2 import service_account
from google.cloud import dialogflowcx_v3
import jwt
import os
from pydantic import BaseModel
from sqlmodel import Session, select
from typing import Optional, List
import uuid

load_dotenv()

router = APIRouter(prefix="/bot", tags=["chatbot"])

# Google credentials
JSON_KEY_PATH = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
PROJECT_ID = os.getenv("GOOGLE_PROJECT_ID")
LOCATION = os.getenv("PROJECT_LOCATION")
AGENT_ID = os.getenv("GOOGLE_AGENT_ID")
LANGUAGE_CODE = "en"

# JWT secret key
SECRET_KEY = os.getenv("JWT_SECRET_KEY")

credentials = service_account.Credentials.from_service_account_file(JSON_KEY_PATH)

client_options = {"api_endpoint": f"{LOCATION}-dialogflow.googleapis.com"}
client = dialogflowcx_v3.SessionsClient(
    credentials=credentials, client_options=client_options
)


class ChatRequest(BaseModel):
    message: Optional[str] = None
    session_id: Optional[str] = None


class ChatResponse(BaseModel):
    response: str
    session_id: str


class RetrievedMessages(BaseModel):
    content: str
    source: str
    timestamp: datetime


class ChatHistory(BaseModel):
    title: str
    messages: List[RetrievedMessages]


class ChatUpdate(BaseModel):
    title: str


def get_uid(cookies):
    if cookies.get("auth") is None:
        raise HTTPException(details="Forbidden content", status_code=401)

    token = cookies.get("auth")
    return jwt.decode(token, SECRET_KEY, algorithms="HS256")["uid"]


def detect_intent(session_id: str, text: str) -> str:
    session_path = client.session_path(PROJECT_ID, LOCATION, AGENT_ID, session_id)

    request = dialogflowcx_v3.DetectIntentRequest(
        session=session_path,
        query_input=dialogflowcx_v3.QueryInput(
            text=dialogflowcx_v3.TextInput(text=text), language_code="en"
        ),
    )

    response = client.detect_intent(request=request)
    return response.query_result.response_messages


def create_chat(uid):
    session_id = str(uuid.uuid4())
    with Session(engine) as session:
        chat = Chat(session_id=session_id, user=uid)
        session.add(chat)
        session.commit()

    return session_id


def log_message(session_id, source, message):
    with Session(engine) as session:
        message = Message(session_id=session_id, source=source, content=message)
        session.add(message)
        session.commit()


@router.post("/temp", response_model=ChatResponse)
def temporary_chat(payload: ChatRequest):
    try:
        session_id = payload.session_id or str(uuid.uuid4())

        user_message = payload.message or "START_CONVERSATION"

        df_responses = detect_intent(session_id, user_message)

        texts = []
        for msg in df_responses:
            if msg.text:
                texts.extend(msg.text.text)

        final_response = (
            " ".join(texts) if texts else "Sorry, I didn’t understand that."
        )

        return ChatResponse(response=final_response, session_id=session_id)
    except Exception as error:
        raise HTTPException(
            status_code=500, detail=f"Internal server error. {error.args}"
        )


@router.post("/chat", response_model=ChatResponse)
def logged_chat(payload: ChatRequest, request: Request):
    try:
        uid = get_uid(request.cookies)

        if payload.session_id:
            session_id = payload.session_id
        else:
            session_id = create_chat(uid)

        user_message = payload.message or "START_CONVERSATION"

        log_message(session_id=session_id, source="user", message=user_message)

        df_responses = detect_intent(session_id, user_message)

        texts = []
        for msg in df_responses:
            if msg.text:
                texts.extend(msg.text.text)

        final_response = (
            " ".join(texts) if texts else "Sorry, I didn’t understand that."
        )

        log_message(session_id=session_id, source="bot", message=final_response)

        return ChatResponse(response=final_response, session_id=session_id)
    except HTTPException:
        raise HTTPException
    except Exception as error:
        raise HTTPException(
            status_code=500, detail=f"Internal server error. {error.args}"
        )


@router.get("/history/{chat_id}", response_model=ChatHistory)
def history(chat_id: str, request: Request):
    try:
        uid = get_uid(request.cookies)

        with Session(engine) as session:
            print(uid)
            chat_query = select(Chat).where(Chat.id == chat_id).where(Chat.user == uid)
            chat = session.exec(chat_query).first()

            if chat is None:
                raise HTTPException(detail="Invalid chat ID", status_code=404)

            msg_query = (
                select(Message)
                .where(Message.session_id == chat.session_id)
                .order_by(Message.timestamp)
            )
            messages = session.exec(msg_query).all()

            return ChatHistory(
                title=chat.title,
                messages=[
                    RetrievedMessages(
                        content=message.content,
                        source=message.source,
                        timestamp=message.timestamp,
                    )
                    for message in messages
                ],
            )
    except HTTPException:
        raise HTTPException
    except Exception as error:
        raise HTTPException(
            status_code=500, detail=f"Internal server error. {error.args}"
        )


@router.put("/chat/{chat_id}", response_model=ChatUpdate)
def update_chat_details(chat_id: str, details: ChatUpdate, request: Request):
    try:
        uid = get_uid(request.cookies)

        with Session(engine) as session:
            query = select(Chat).where(Chat.id == chat_id).where(Chat.user == uid)
            chat = session.exec(query).first()

            if chat is None:
                raise HTTPException(detail="Invalid chat ID", status_code=404)

            chat.title = details.title
            session.add(chat)
            session.commit()
            session.refresh()

            return chat
    except HTTPException:
        raise HTTPException
    except Exception as error:
        raise HTTPException(
            detail=f"Internal server error. {error.args}", status_code=500
        )
