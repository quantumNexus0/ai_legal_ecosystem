from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func

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
