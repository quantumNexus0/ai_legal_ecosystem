from typing import Optional
from pydantic import BaseModel
from datetime import datetime

class CaseBase(BaseModel):
    title: str
    type: Optional[str] = None
    description: Optional[str] = None
    status: str = "active"
    nextHearing: Optional[str] = None

class CaseCreate(BaseModel):
    title: str
    case_type: str
    description: Optional[str] = None
    client_id: int
    lawyer_id: Optional[int] = None

class CaseUpdate(BaseModel):
    title: Optional[str] = None
    status: Optional[str] = None

class Case(CaseBase):
    id: int
    lawyer_id: int
    client_id: int
    created_at: datetime
    lawyer: Optional[str] = None
    client: Optional[str] = None
    
    class Config:
        from_attributes = True
