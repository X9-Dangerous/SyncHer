import os
from pathlib import Path
from dotenv import load_dotenv
from google.cloud import dialogflowcx_v3
from google.api_core.client_options import ClientOptions

# Load environment variables
load_dotenv()

# Set absolute path to credentials
credentials_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
if credentials_path and not os.path.isabs(credentials_path):
    # Convert relative path to absolute
    base_dir = Path(__file__).resolve().parent.parent.parent  # Go up to backend/
    credentials_path = str(base_dir / credentials_path)
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = credentials_path

# Dialogflow Configuration
project_id = os.getenv("PROJECT_ID")
location = os.getenv("PROJECT_LOCATION") 
agent_id = os.getenv("GOOGLE_AGENT_ID")
language_code = "en"

def detect_intent(text: str, session_id: str = "default"):
    #Ensure session_id is a string
    session_id = str(session_id) if session_id else "default_session"
    # Create a client
    client_options = None
    if location != "global":
        api_endpoint = f"{location}-dialogflow.googleapis.com"
        client_options = ClientOptions(api_endpoint=api_endpoint)

    session_client = dialogflowcx_v3.SessionsClient(client_options=client_options)

    # Build the session path: projects/*/locations/*/agents/*/sessions/*
    session = session_client.session_path(
        project=project_id,
        location=location,
        agent=agent_id,
        session=session_id
    )

    # Construct the request
    text_input = dialogflowcx_v3.TextInput(text=text)
    query_input = dialogflowcx_v3.QueryInput(text=text_input, language_code=language_code)

    request = dialogflowcx_v3.DetectIntentRequest(
        session=session,
        query_input=query_input
    )

    response = session_client.detect_intent(request=request)

    # Format response
    response_text = ""
    response_messages = response.query_result.response_messages
    if response_messages:
        # Concatenate all text responses
        response_text = " ".join(
            [msg.text.text[0] for msg in response_messages if msg.text]
        )

    return {
        "intent": response.query_result.intent.display_name,
        "confidence": response.query_result.intent_detection_confidence,
        "response": response_text,
        "session_id": session_id,
    }