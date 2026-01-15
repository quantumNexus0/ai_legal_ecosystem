from typing import Optional
from datetime import datetime
from pydantic import BaseModel

class MessageBase(BaseModel):
    content: str
    receiver_id: int
    case_id: Optional[int] = None

class MessageCreate(MessageBase):
    pass

class MessageUpdate(BaseModel):
    is_read: bool

class Message(MessageBase):
    id: int
    sender_id: int
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True
