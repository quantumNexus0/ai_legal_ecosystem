from typing import Optional
from pydantic import BaseModel

# Schema for updating lawyer profile
class LawyerProfileUpdate(BaseModel):
    specialization: Optional[str] = None
    experience_years: Optional[int] = None
    profile_image_url: Optional[str] = None
    office_address: Optional[str] = None

# Schema for public lawyer information (for landing page)
class LawyerPublic(BaseModel):
    id: int
    full_name: str
    email: str
    specialization: Optional[str] = None
    experience_years: Optional[int] = None
    rating: float = 0.0
    cases_handled: int = 0
    profile_image_url: Optional[str] = None
    office_address: Optional[str] = None
    phone: Optional[str] = None

    class Config:
        from_attributes = True
