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
@router.post("/users/me/change-password")
def change_password(
    *,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
    password_in: user_schemas.UserPasswordChange,
) -> Any:
    """
    Change current user's password.
    """
    from app.core import security
    if not security.verify_password(password_in.old_password, current_user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect old password")
    
    current_user.hashed_password = security.get_password_hash(password_in.new_password)
    db.add(current_user)
    db.commit()
    return {"message": "Password updated successfully"}

@router.get("/users/me/settings", response_model=user_schemas.UserSettings)
def get_user_settings(
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    """
    Get current user's settings.
    """
    import json
    if not current_user.settings:
        return user_schemas.UserSettings()
    return user_schemas.UserSettings(**json.loads(current_user.settings))

@router.put("/users/me/settings", response_model=user_schemas.UserSettings)
def update_user_settings(
    *,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
    settings_in: user_schemas.UserSettings,
) -> Any:
    """
    Update current user's settings.
    """
    import json
    current_user.settings = json.dumps(settings_in.dict())
    db.add(current_user)
    db.commit()
    return settings_in
