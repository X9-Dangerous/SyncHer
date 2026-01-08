from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from sqlmodel import Session, select
from db.engine import engine
from db.models import Users
from app.services.utils import verify_password, create_access_token
from app.schemas import Login

router = APIRouter(
    prefix = "/auth",
    tags = ["Auth"]
)


@router.post("/login")
def login(user: Login):
    with Session(engine) as session:
        statement = select(Users).where(Users.email == user.email)
        result = session.exec(statement).first()

        if not result:
            raise HTTPException(status_code = 401, detail = "Invalid email or password")

        if not verify_password(user.password, result.password):
            raise HTTPException(status_code = 401, detail = "Invalid email or password")

        token = create_access_token({"sub": str(result.id), "email": result.email})

        return {"access_token": token, "token_type": "bearer"}