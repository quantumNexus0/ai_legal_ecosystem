from typing import Optional
from pydantic import BaseModel, Field
from datetime import datetime

class AppointmentBase(BaseModel):
    title: Optional[str] = None
    type: Optional[str] = None
    date: Optional[str] = None
    time: Optional[str] = None
    status: str = "scheduled"
    description: Optional[str] = None

class AppointmentCreate(BaseModel):
    title: str
    appointment_type: str
    appointment_time: datetime
    client_id: int
    lawyer_id: Optional[int] = None
    description: Optional[str] = None

class AppointmentUpdate(BaseModel):
    status: Optional[str] = None

class Appointment(AppointmentBase):
    id: int
    lawyer_id: int
    client_id: int
    # Alias 'with' as it's a reserved keyword in some contexts, but fine as a schema field string
    # Actually pydantic handles it fine.
    # Note: 'with' is a reserved keyword in Python, so using 'with_' in code and alias for JSON
    with_: Optional[str] = Field(None, alias="with")

    class Config:
        from_attributes = True
        populate_by_name = True
        json_schema_extra = {
            "example": {
                "with": "John Doe"
            }
        }
