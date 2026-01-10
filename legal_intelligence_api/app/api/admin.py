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
    active_lawyers = db.query(User).filter(User.role == "lawyer", User.is_active == True).count()
    total_cases = db.query(Case).count()
    # Pending approvals could be lawyers who are not yet validated or active? 
    # Let's assume is_active=False means pending for now
    pending_approvals = db.query(User).filter(User.role == "lawyer", User.is_active == False).count()
    
    return {
        "total_users": total_users,
        "active_lawyers": active_lawyers,
        "total_cases": total_cases,
        "pending_approvals": pending_approvals
    }

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
    
    return db.query(User).filter(User.role == "lawyer", User.is_active == True).all()
