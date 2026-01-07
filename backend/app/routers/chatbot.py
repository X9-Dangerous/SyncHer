from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from google.oauth2 import service_account
from google.cloud import dialogflowcx_v3
import os 
import uuid
from dotenv import load_dotenv
load_dotenv()

router = APIRouter(prefix="/bot",tags=["chatbot"])

JSON_KEY_PATH = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
PROJECT_ID = os.getenv("GOOGLE_PROJECT_ID")
LOCATION = os.getenv("PROJECT_LOCATION")
AGENT_ID = os.getenv("GOOGLE_AGENT_ID")
LANGUAGE_CODE = "en"

print(JSON_KEY_PATH)

credentials = service_account.Credentials.from_service_account_file(JSON_KEY_PATH)

client_options = {"api_endpoint": f"{LOCATION}-dialogflow.googleapis.com"}
client = dialogflowcx_v3.SessionsClient(
    credentials=credentials, 
    client_options=client_options
)

class ChatRequest(BaseModel):
    message: Optional[str] = None
    session_id: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    session_id: str

def detect_intent(session_id: str, text: str) -> str:
    session_path = client.session_path(
        PROJECT_ID, LOCATION, AGENT_ID, session_id
    )

    request = dialogflowcx_v3.DetectIntentRequest(
        session=session_path,
        query_input=dialogflowcx_v3.QueryInput(
            text=dialogflowcx_v3.TextInput(text=text),
            language_code="en"
        )
    )

    response = client.detect_intent(request=request)
    return response.query_result.response_messages

@router.post("/chat", response_model=ChatResponse)
def chat(payload: ChatRequest):
    """
    Anonymous chatbot interaction via Dialogflow CX.
    """

    session_id = payload.session_id or str(uuid.uuid4())

    user_message = payload.message or "START_CONVERSATION"

    df_responses = detect_intent(session_id, user_message)

    texts = []
    for msg in df_responses:
        if msg.text:
            texts.extend(msg.text.text)

    final_response = " ".join(texts) if texts else "Sorry, I didn’t understand that."

    return ChatResponse(
        response=final_response,
        session_id=session_id
    )