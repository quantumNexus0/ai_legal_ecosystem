from typing import Optional
from pydantic import BaseModel, EmailStr

class UserProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None

class ProfileImageUpdate(BaseModel):
    profile_image_url: str
