from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.schemas import UserCreate
from db.engine import engine
from db.models import Users
from app.services.utils import hash_password

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register")
def register(user: UserCreate):
    with Session(engine) as session:
        # Check if email exists
        existing_user = session.exec(select(Users).where(Users.email == user.email)).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")
        
        
        hashed_pw = hash_password(user.password)
        
        new_user = Users(
            name=user.name,
            email=user.email,
            password=hashed_pw
        )
        session.add(new_user)
        session.commit()
        session.refresh(new_user)

        return {"message": "User registered successfully", "user_id": str(new_user.id)}
