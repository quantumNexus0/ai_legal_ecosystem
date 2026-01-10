from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api import deps
from app.models import User
from app.models import LawyerProfile
from app.schemas import user as user_schemas
from app.schemas import profile as profile_schemas

router = APIRouter()

@router.put("/users/me/profile", response_model=user_schemas.User)
def update_user_profile(
    *,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
    profile_in: profile_schemas.UserProfileUpdate,
) -> Any:
    """
    Update current user's basic profile information.
    """
    # Update fields
    if profile_in.full_name is not None:
        current_user.full_name = profile_in.full_name
    if profile_in.email is not None:
        # Check if email already exists
        existing_user = db.query(User).filter(User.email == profile_in.email).first()
        if existing_user and existing_user.id != current_user.id:
            raise HTTPException(status_code=400, detail="Email already registered")
        current_user.email = profile_in.email
    if profile_in.phone is not None:
        current_user.phone = profile_in.phone
    
    db.add(current_user)
    db.commit()
    db.refresh(current_user)
    
    if current_user.role == "lawyer" and current_user.lawyer_profile:
        current_user.specialization = current_user.lawyer_profile.specialization
        current_user.experience_years = current_user.lawyer_profile.experience_years
        current_user.office_address = current_user.lawyer_profile.office_address
        
    return current_user

@router.put("/users/me/profile/image")
def update_profile_image(
    *,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
    image_in: profile_schemas.ProfileImageUpdate,
) -> Any:
    """
    Update profile image URL for both regular users and lawyers.
    """
    # For lawyers, update both User and LawyerProfile tables
    if current_user.role == "lawyer":
        profile = db.query(LawyerProfile).filter(LawyerProfile.user_id == current_user.id).first()
        if not profile:
            profile = LawyerProfile(user_id=current_user.id)
            db.add(profile)
        profile.profile_image_url = image_in.profile_image_url
        db.commit()
    
    # Update User table for all users
    current_user.profile_image_url = image_in.profile_image_url
    db.add(current_user)
    db.commit()
    db.refresh(current_user)
    
    return {"message": "Profile image updated successfully", "image_url": current_user.profile_image_url}
