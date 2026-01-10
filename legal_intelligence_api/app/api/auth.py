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
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not security.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password",
        )
    if not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    
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
    user = db.query(User).filter(User.email == user_in.email).first()
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this username already exists in the system.",
        )
    
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
    
    # Create LawyerProfile if user is a lawyer
    if user.role == "lawyer":
        from app.models import LawyerProfile
        lawyer_profile = LawyerProfile(user_id=user.id)
        db.add(lawyer_profile)
        db.commit()
    
    return user

@router.get("/users/me", response_model=user_schemas.User)
def read_users_me(
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    if current_user.role == "lawyer" and current_user.lawyer_profile:
        # Mix in lawyer profile fields
        current_user.specialization = current_user.lawyer_profile.specialization
        current_user.experience_years = current_user.lawyer_profile.experience_years
        current_user.office_address = current_user.lawyer_profile.office_address
    return current_user
