from sqlalchemy import Column, text
from sqlalchemy.dialects.postgresql import DATERANGE, UUID as PG_UUID
from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime
import uuid

class Users(SQLModel, table=True):
    id: str | None = Field(
        default=None,
        sa_column=Column(
            PG_UUID(as_uuid=True),
            primary_key=True,
            server_default=text("uuid_generate_v4()"),
            nullable=False,
        ),
    )
    name: str
    email: str
    password: str


class PeriodDays(SQLModel, table=True):
    id: str | None = Field(
        default=None,
        sa_column=Column(
            PG_UUID(as_uuid=True),
            primary_key=True,
            server_default=text("uuid_generate_v4()"),
            nullable=False,
        ),
    )
    user: uuid.UUID = Field(foreign_key="users.id")
    period: Optional[str] = Field(sa_column=Column(DATERANGE))

class ChatLogs(SQLModel, table=True):
    id: str | None = Field(
        default=None,
        sa_column=Column(
            PG_UUID(as_uuid=True),
            primary_key=True,
            server_default=text("uuid_generate_v4()"),
            nullable=False,
        ),
    )
    user_id: uuid.UUID = Field(foreign_key="users.id")
    question: str
    response: str
    intent: Optional[str] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)