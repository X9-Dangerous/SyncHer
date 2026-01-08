from app.routers.chatbot import router
import bcrypt
from db.db_engine import engine
from db.db_models import User
from dotenv import load_dotenv
import jwt
import os
from pydantic import BaseModel, EmailStr
from fastapi import FastAPI, Response
from sqlmodel import Session, select

load_dotenv()

app = FastAPI(name="SyncHer")

app.include_router(router)

SECRET_KEY = os.getenv("JWT_SECRET_KEY")


def check_auth(clean_password, hashed_password):
    return bcrypt.checkpw(
        clean_password.encode("utf-8"), hashed_password.encode("utf-8")
    )


class UserData(BaseModel):
    email: EmailStr
    name: str
    password: str


class AuthData(BaseModel):
    email: EmailStr
    password: str


@app.post("/accounts/register")
async def register(data: UserData):
    try:
        hashed_password = bcrypt.hashpw(data.password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

        with Session(engine) as session:
            user_details = User(
                name=data.name, email=data.email, password=hashed_password
            )
            session.add(user_details)
            session.commit()

        return Response(content="User registered successfully", status_code=201)
    except Exception as error:
        return Response(
            content=f"Unable to register user.{error.args}", status_code=500
        )


@app.post("/accounts/login")
async def login(data: AuthData, response: Response):
    try:
        with Session(engine) as session:
            query = select(User).where(User.email == data.email)
            user = session.exec(query).first()

            if user is None or not check_auth(data.password, user.password):
                return Response(
                    content="Invalid authentication credentials", status_code=401
                )

            payload = {"uid": str(user.id)}
            token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")

            response.set_cookie(
                key="auth", value=token, httponly=True, secure=True, max_age=3600
            )

            return {"message": "Authenticated successfully"}

    except Exception as error:
        return Response(content=f"Internal server error. {error.args}", status_code=500)


# @app.post("")
# async def period_tracking():
#     pass
