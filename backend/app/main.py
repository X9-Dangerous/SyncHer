from app.routers.chatbot import router
import bcrypt
from datetime import date
from db.db_engine import engine
from db.db_models import User, PeriodDays
from dotenv import load_dotenv
from fastapi import FastAPI, Response, Request, HTTPException
import jwt
import os
from psycopg2.extras import DateRange
from pydantic import BaseModel, EmailStr
from sqlmodel import Session, select
from typing import List

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


class TrackerRange(BaseModel):
    start_date: str
    end_date: str


class PeriodEntries(BaseModel):
    entry_id: str
    lower: date
    upper: date


def get_uid(cookies):
    if cookies.get("auth") is None:
        return Response(content="Forbidden content", status_code=401)

    token = cookies.get("auth")
    return jwt.decode(token, SECRET_KEY, algorithms="HS256")["uid"]


@app.post("/accounts/register")
async def register(data: UserData):
    try:
        hashed_password = bcrypt.hashpw(
            data.password.encode("utf-8"), bcrypt.gensalt()
        ).decode("utf-8")

        with Session(engine) as session:
            user_details = User(
                name=data.name, email=data.email, password=hashed_password
            )
            session.add(user_details)
            session.commit()

        return Response(content="User registered successfully", status_code=201)
    except Exception as error:
        raise HTTPException(
            status_code=500, detail=f"Internal server error. {error.args}"
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
        raise HTTPException(
            status_code=500, detail=f"Internal server error. {error.args}"
        )


@app.post("/accounts/logout")
async def logout(response: Response):
    try:
        response.delete_cookie(key="auth")
        return Response(content="Logged out successfully", status_code=200)
    except Exception as error:
        raise HTTPException(
            status_code=500, detail=f"Internal server error. {error.args}"
        )


@app.post("/tracker/add-days")
async def add_days(dates: TrackerRange, request: Request):
    try:
        uid = get_uid(request.cookies)

        date_range = DateRange(
            date.fromisoformat(dates.start_date),
            date.fromisoformat(dates.end_date),
            "[]",
        )

        with Session(engine) as session:
            days = PeriodDays(user=uid, period=date_range)
            session.add(days)
            session.commit()

        return {"message": "Days added successfully"}
    except ValueError as date_error:
        raise HTTPException(
            detail=f"Use ISO date format i.e. 'YYYY-MM-DD'. {date_error.args}",
            status_code=422,
        )
    except Exception as error:
        raise HTTPException(
            status_code=500, detail=f"Internal server error. {error.args}"
        )


@app.get("/tracker/get-days", response_model=List[PeriodEntries])
async def get_days(request: Request):
    try:
        uid = get_uid(request.cookies)

        with Session(engine) as session:
            query = select(PeriodDays).where(PeriodDays.user == uid)
            results = session.exec(query).all()

            entries = [
                PeriodEntries(
                    entry_id=str(entry.id),
                    lower=entry.period.lower,
                    upper=entry.period.upper,
                )
                for entry in results
            ]

            return entries
    except Exception as error:
        raise HTTPException(
            status_code=500, detail=f"Internal server error. {error.args}"
        )
