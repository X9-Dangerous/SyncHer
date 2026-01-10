from datetime import datetime, date
from sqlalchemy import Column, text
from sqlalchemy.dialects.postgresql import DATERANGE, UUID as PG_UUID, Range
from sqlmodel import SQLModel, Field
import uuid


class User(SQLModel, table=True):
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
    user: uuid.UUID = Field(foreign_key="user.id")
    period: Range[date] = Field(sa_column=Column(DATERANGE()))


class Chat(SQLModel, table=True):
    id: str | None = Field(
        default=None,
        sa_column=Column(
            PG_UUID(as_uuid=True),
            primary_key=True,
            server_default=text("uuid_generate_v4()"),
            nullable=False,
        ),
    )
    user: uuid.UUID = Field(foreign_key="user.id")
    title: str = Field(default="Untitled Chat")
    session_id: uuid.UUID


class Message(SQLModel, table=True):
    id: str | None = Field(
        default=None,
        sa_column=Column(
            PG_UUID(as_uuid=True),
            primary_key=True,
            server_default=text("uuid_generate_v4()"),
            nullable=False,
        ),
    )
    session_id: uuid.UUID
    source: str = Field(default="user")
    content: str
    timestamp: datetime = Field(default_factory=datetime.now)
