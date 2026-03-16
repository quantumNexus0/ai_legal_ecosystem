from typing import Optional, List
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(cls, field_schema):
        field_schema.update(type="string")

class MongoBaseModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")

    class Config:
        json_encoders = {ObjectId: str}
        populate_by_name = True

class LawyerProfileMongo(BaseModel):
    specialization: Optional[str] = None
    experience_years: Optional[int] = 0
    rating: Optional[float] = 0.0
    cases_handled: Optional[int] = 0
    profile_image_url: Optional[str] = None
    office_address: Optional[str] = None
    license_number: Optional[str] = None
    bio: Optional[str] = None
    is_approved: bool = False

class UserMongo(MongoBaseModel):
    email: EmailStr
    hashed_password: str
    full_name: Optional[str] = None
    role: str = "user"
    is_active: bool = True
    profile_image_url: Optional[str] = None
    phone: Optional[str] = None
    settings: Optional[dict] = None
    lawyer_profile: Optional[LawyerProfileMongo] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

class CaseMongo(MongoBaseModel):
    title: str
    case_type: Optional[str] = None
    description: Optional[str] = None
    status: str = "active"
    next_hearing: Optional[datetime] = None
    lawyer_id: str # Reference to UserMongo id
    client_id: str # Reference to UserMongo id
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class AppointmentMongo(MongoBaseModel):
    title: Optional[str] = None
    appointment_type: Optional[str] = None
    lawyer_id: str
    client_id: str
    appointment_time: datetime
    status: str = "scheduled"
    description: Optional[str] = None

class LawyerRequestMongo(MongoBaseModel):
    user_id: str
    lawyer_id: str
    message: Optional[str] = None
    status: str = "pending"
    created_at: datetime = Field(default_factory=datetime.utcnow)

class MessageMongo(MongoBaseModel):
    sender_id: str
    receiver_id: str
    content: str
    is_read: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
