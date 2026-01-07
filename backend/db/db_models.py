from sqlalchemy import Column, text
from sqlalchemy.dialects.postgresql import DATERANGE, UUID as PG_UUID
from sqlmodel import SQLModel, Field
from typing import Optional
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
    period: Optional[str] = Field(sa_column=Column(DATERANGE))