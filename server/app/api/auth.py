from datetime import timedelta
from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.api import deps
from app.core import security
from app.core.config import settings
from app.models import User
from app.schemas import user as user_schemas
from app.schemas import token as token_schemas


router = APIRouter()

@router.post("/auth/login", response_model=token_schemas.Token)
def login_access_token(
    db: Session = Depends(deps.get_db),
    form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    print(f"DEBUG: Login attempt for email: {form_data.username}")
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user:
        print(f"DEBUG: Login failed - User not found: {form_data.username}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password",
        )
    if not security.verify_password(form_data.password, user.hashed_password):
        print(f"DEBUG: Login failed - Wrong password for: {form_data.username}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password",
        )
    if not user.is_active:
        print(f"DEBUG: Login failed - User inactive: {form_data.username}")
        raise HTTPException(status_code=400, detail="Inactive user")
    
    print(f"DEBUG: Login success for: {form_data.username}")
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return {
        "access_token": security.create_access_token(
            user.id, expires_delta=access_token_expires
        ),
        "token_type": "bearer",
    }

@router.post("/auth/signup", response_model=user_schemas.User)
def create_user(
    *,
    db: Session = Depends(deps.get_db),
    user_in: user_schemas.UserCreate,
) -> Any:
    print(f"DEBUG: Signup attempt for email: {user_in.email}")
    user = db.query(User).filter(User.email == user_in.email).first()
    if user:
        print(f"DEBUG: Signup failed - User already exists: {user_in.email}")
        raise HTTPException(
            status_code=400,
            detail="The user with this username already exists in the system.",
        )
    
    try:
        hashed = security.get_password_hash(user_in.password)
        
        user = User(
            email=user_in.email,
            hashed_password=hashed,
            full_name=user_in.full_name,
            role=user_in.role,
            is_active=True,
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        print(f"DEBUG: Signup success for: {user_in.email}")
        
        # Create LawyerProfile if user is a lawyer
        if user.role == "lawyer":
            from app.models import LawyerProfile
            lawyer_profile = LawyerProfile(user_id=user.id, is_approved=False)
            db.add(lawyer_profile)
            db.commit()
            print(f"DEBUG: Lawyer profile created for: {user_in.email}")
        
        return user
    except Exception as e:
        print(f"DEBUG: Signup failed - Error: {str(e)}")
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error during registration: {str(e)}"
        )

@router.get("/users/me", response_model=user_schemas.User)
def read_users_me(
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    if current_user.role == "lawyer" and current_user.lawyer_profile:
        # Mix in lawyer profile fields
        current_user.specialization = current_user.lawyer_profile.specialization
        current_user.experience_years = current_user.lawyer_profile.experience_years
        current_user.office_address = current_user.lawyer_profile.office_address
        current_user.license_number = current_user.lawyer_profile.license_number
        current_user.bio = current_user.lawyer_profile.bio
        current_user.is_approved = current_user.lawyer_profile.is_approved
    return current_user
