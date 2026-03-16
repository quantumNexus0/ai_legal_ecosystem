"""
Dashboard Analytics — aggregate data for performance charts.
"""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func, extract
from datetime import datetime

from app.api.deps import get_db, get_current_user
from app.models import User, Case, Appointment, LawyerProfile

router = APIRouter()


@router.get("/api/analytics/cases")
def get_case_analytics(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get case analytics — by status, type, and month."""

    # Filter based on role
    if current_user.role == "lawyer":
        base_query = db.query(Case).filter(Case.lawyer_id == current_user.id)
    elif current_user.role == "admin":
        base_query = db.query(Case)
    else:
        base_query = db.query(Case).filter(Case.client_id == current_user.id)

    # Cases by status
    status_data = base_query.with_entities(
        Case.status, func.count(Case.id)
    ).group_by(Case.status).all()

    # Cases by type
    type_data = base_query.with_entities(
        Case.case_type, func.count(Case.id)
    ).group_by(Case.case_type).all()

    # Cases by month (current year)
    monthly_data = base_query.filter(
        extract('year', Case.created_at) == datetime.utcnow().year
    ).with_entities(
        extract('month', Case.created_at).label('month'),
        func.count(Case.id)
    ).group_by('month').all()

    return {
        "by_status": [{"status": s or "unknown", "count": c} for s, c in status_data],
        "by_type": [{"type": t or "unknown", "count": c} for t, c in type_data],
        "by_month": [{"month": int(m), "count": c} for m, c in monthly_data],
        "total_cases": base_query.count()
    }


@router.get("/api/analytics/performance")
def get_performance_analytics(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get performance metrics for lawyers or admins."""

    if current_user.role == "admin":
        # Admin sees overall platform stats
        total_users = db.query(User).count()
        total_lawyers = db.query(User).filter(User.role == "lawyer").count()
        total_clients = db.query(User).filter(User.role == "user").count()
        total_cases = db.query(Case).count()
        active_cases = db.query(Case).filter(Case.status == "active").count()
        total_appointments = db.query(Appointment).count()

        # Top lawyers by rating
        top_lawyers = db.query(
            User.full_name, LawyerProfile.specialization,
            LawyerProfile.rating, LawyerProfile.cases_handled
        ).join(LawyerProfile, User.id == LawyerProfile.user_id).order_by(
            LawyerProfile.rating.desc()
        ).limit(5).all()

        return {
            "platform_stats": {
                "total_users": total_users,
                "total_lawyers": total_lawyers,
                "total_clients": total_clients,
                "total_cases": total_cases,
                "active_cases": active_cases,
                "total_appointments": total_appointments
            },
            "top_lawyers": [
                {
                    "name": name or "Unknown",
                    "specialization": spec,
                    "rating": rating,
                    "cases_handled": handled
                }
                for name, spec, rating, handled in top_lawyers
            ]
        }

    elif current_user.role == "lawyer":
        profile = db.query(LawyerProfile).filter(
            LawyerProfile.user_id == current_user.id
        ).first()

        total_cases = db.query(Case).filter(Case.lawyer_id == current_user.id).count()
        active_cases = db.query(Case).filter(
            Case.lawyer_id == current_user.id, Case.status == "active"
        ).count()
        closed_cases = db.query(Case).filter(
            Case.lawyer_id == current_user.id, Case.status == "closed"
        ).count()
        unique_clients = db.query(Case.client_id).filter(
            Case.lawyer_id == current_user.id
        ).distinct().count()

        return {
            "lawyer_stats": {
                "total_cases": total_cases,
                "active_cases": active_cases,
                "closed_cases": closed_cases,
                "unique_clients": unique_clients,
                "rating": profile.rating if profile else 0,
                "cases_handled": profile.cases_handled if profile else 0,
                "specialization": profile.specialization if profile else "Not set",
                "success_rate": round((closed_cases / total_cases * 100) if total_cases > 0 else 0, 1)
            }
        }

    else:
        # Client stats
        total_cases = db.query(Case).filter(Case.client_id == current_user.id).count()
        active_cases = db.query(Case).filter(
            Case.client_id == current_user.id, Case.status == "active"
        ).count()

        return {
            "client_stats": {
                "total_cases": total_cases,
                "active_cases": active_cases,
                "lawyers_hired": db.query(Case.lawyer_id).filter(
                    Case.client_id == current_user.id
                ).distinct().count()
            }
        }
