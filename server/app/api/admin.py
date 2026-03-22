from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.core.security import get_password_hash

from app.api import deps
from app.models import User
from app.models import Case
from app.models import LawyerProfile
from app.schemas import user as user_schemas
from app.schemas import dashboard as dashboard_schemas

router = APIRouter()

@router.get("/admin/stats", response_model=dashboard_schemas.AdminDashboardStats)
def get_admin_stats(
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    total_users = db.query(User).count()
    active_lawyers = db.query(User).join(LawyerProfile).filter(LawyerProfile.is_approved == True).count()
    total_cases = db.query(Case).count()
    pending_approvals = db.query(User).join(LawyerProfile).filter(LawyerProfile.is_approved == False).count()
    
    return {
        "total_users": total_users,
        "active_lawyers": active_lawyers,
        "total_cases": total_cases,
        "pending_approvals": pending_approvals
    }

@router.get("/admin/lawyers/pending", response_model=List[user_schemas.User])
def get_pending_lawyers(
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    users = db.query(User).join(LawyerProfile).filter(LawyerProfile.is_approved == False).all()
    # Mix in profile fields
    for user in users:
        if user.lawyer_profile:
            user.specialization = user.lawyer_profile.specialization
            user.experience_years = user.lawyer_profile.experience_years
            user.office_address = user.lawyer_profile.office_address
            user.license_number = user.lawyer_profile.license_number
            user.bio = user.lawyer_profile.bio
            user.is_approved = user.lawyer_profile.is_approved
    return users

@router.post("/admin/lawyers/{lawyer_id}/approve")
def approve_lawyer(
    lawyer_id: int,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    lawyer = db.query(User).filter(User.id == lawyer_id, User.role == "lawyer").first()
    if not lawyer:
        raise HTTPException(status_code=404, detail="Lawyer not found")
    
    if lawyer.lawyer_profile:
        lawyer.lawyer_profile.is_approved = True
        lawyer.is_active = True
        db.commit()
    
    return {"message": "Lawyer approved successfully"}

@router.post("/admin/lawyers/{lawyer_id}/reject")
def reject_lawyer(
    lawyer_id: int,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    lawyer = db.query(User).filter(User.id == lawyer_id, User.role == "lawyer").first()
    if not lawyer:
        raise HTTPException(status_code=404, detail="Lawyer not found")
    
    if lawyer.lawyer_profile:
        # For now, we just keep them unapproved and inactive
        lawyer.lawyer_profile.is_approved = False
        lawyer.is_active = False
        db.commit()
    
    return {"message": "Lawyer rejected successfully"}

@router.get("/admin/users/recent", response_model=List[user_schemas.User])
def get_recent_users(
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    return db.query(User).order_by(User.id.desc()).limit(10).all()

@router.get("/admin/lawyers/active", response_model=List[user_schemas.User])
def get_active_lawyers(
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    users = db.query(User).join(LawyerProfile).filter(LawyerProfile.is_approved == True).all()
    for user in users:
        if user.lawyer_profile:
            user.specialization = user.lawyer_profile.specialization
            user.experience_years = user.lawyer_profile.experience_years
            user.office_address = user.lawyer_profile.office_address
            user.license_number = user.lawyer_profile.license_number
            user.bio = user.lawyer_profile.bio
            user.is_approved = user.lawyer_profile.is_approved
    return users

@router.get("/admin/users", response_model=List[user_schemas.User])
def get_all_users(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    users = db.query(User).offset(skip).limit(limit).all()
    for user in users:
        if user.lawyer_profile:
            user.specialization = user.lawyer_profile.specialization
            user.experience_years = user.lawyer_profile.experience_years
            user.office_address = user.lawyer_profile.office_address
            user.license_number = user.lawyer_profile.license_number
            user.bio = user.lawyer_profile.bio
            user.is_approved = user.lawyer_profile.is_approved
    return users

@router.post("/admin/users", response_model=user_schemas.User)
def create_user_admin(
    *,
    db: Session = Depends(deps.get_db),
    user_in: user_schemas.UserCreate,
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    user = db.query(User).filter(User.email == user_in.email).first()
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system.",
        )
    
    db_obj = User(
        email=user_in.email,
        hashed_password=get_password_hash(user_in.password),
        full_name=user_in.full_name,
        role=user_in.role,
        is_active=user_in.is_active if user_in.is_active is not None else True,
        phone=user_in.phone,
    )
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    
    if user_in.role == "lawyer":
        lawyer_profile = LawyerProfile(
            user_id=db_obj.id,
            specialization=user_in.specialization,
            experience_years=user_in.experience_years,
            office_address=user_in.office_address,
            license_number=user_in.license_number,
            bio=user_in.bio,
            is_approved=user_in.is_approved if user_in.is_approved is not None else True # Default to True when admin creates
        )
        db.add(lawyer_profile)
        db.commit()
        db.refresh(db_obj)
        
        # Enrich the response object with profile data
        db_obj.specialization = lawyer_profile.specialization
        db_obj.experience_years = lawyer_profile.experience_years
        db_obj.office_address = lawyer_profile.office_address
        db_obj.license_number = lawyer_profile.license_number
        db_obj.bio = lawyer_profile.bio
        db_obj.is_approved = lawyer_profile.is_approved
        
    print(f"Created {db_obj.role}: {db_obj.email} (ID: {db_obj.id})")
    return db_obj

@router.patch("/admin/users/{user_id}/status", response_model=user_schemas.User)
def update_user_status(
    *,
    db: Session = Depends(deps.get_db),
    user_id: int,
    is_active: bool,
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.is_active = is_active
    db.add(user)
    db.commit()
    db.refresh(user)
    
    # Mix in profile fields for response consistency
    if user.lawyer_profile:
        user.specialization = user.lawyer_profile.specialization
        user.experience_years = user.lawyer_profile.experience_years
        user.office_address = user.lawyer_profile.office_address
        user.license_number = user.lawyer_profile.license_number
        user.bio = user.lawyer_profile.bio
        user.is_approved = user.lawyer_profile.is_approved
        
    return user

@router.put("/admin/users/{user_id}", response_model=user_schemas.User)
def update_user_admin(
    *,
    db: Session = Depends(deps.get_db),
    user_id: int,
    user_in: user_schemas.UserUpdate,
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Update regular User fields
    if user_in.email is not None:
        user.email = user_in.email
    if user_in.full_name is not None:
        user.full_name = user_in.full_name
    if user_in.password is not None:
        user.hashed_password = get_password_hash(user_in.password)
    if user_in.role is not None:
        user.role = user_in.role
    if user_in.is_active is not None:
        user.is_active = user_in.is_active
    if user_in.phone is not None:
        user.phone = user_in.phone
        
    db.add(user)
    db.commit()
    db.refresh(user)
    
    # Update LawyerProfile if applicable
    if user.role == "lawyer":
        lawyer_profile = db.query(LawyerProfile).filter(LawyerProfile.user_id == user.id).first()
        if not lawyer_profile:
            lawyer_profile = LawyerProfile(user_id=user.id)
            db.add(lawyer_profile)
            
        if user_in.specialization is not None:
            lawyer_profile.specialization = user_in.specialization
        if user_in.experience_years is not None:
            lawyer_profile.experience_years = user_in.experience_years
        if user_in.office_address is not None:
            lawyer_profile.office_address = user_in.office_address
        if user_in.license_number is not None:
            lawyer_profile.license_number = user_in.license_number
        if user_in.bio is not None:
            lawyer_profile.bio = user_in.bio
        if user_in.is_approved is not None:
            lawyer_profile.is_approved = user_in.is_approved
            
        db.add(lawyer_profile)
        db.commit()
        db.refresh(user)
        
        # Mix in profile fields
        user.specialization = lawyer_profile.specialization
        user.experience_years = lawyer_profile.experience_years
        user.office_address = lawyer_profile.office_address
        user.license_number = lawyer_profile.license_number
        user.bio = lawyer_profile.bio
        user.is_approved = lawyer_profile.is_approved
        
    return user
