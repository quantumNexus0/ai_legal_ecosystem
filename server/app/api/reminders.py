"""
Appointment Reminders — service for checking upcoming appointments.
"""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta

from app.api.deps import get_db, get_current_user
from app.models import User, Appointment

router = APIRouter()


@router.get("/api/reminders/upcoming")
def get_upcoming_reminders(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Get appointments within the next 24 hours for the current user.
    """
    now = datetime.utcnow()
    next_24h = now + timedelta(hours=24)

    if current_user.role == "lawyer":
        appointments = db.query(Appointment).filter(
            Appointment.lawyer_id == current_user.id,
            Appointment.appointment_time >= now,
            Appointment.appointment_time <= next_24h,
            Appointment.status != "cancelled"
        ).all()
    else:
        appointments = db.query(Appointment).filter(
            Appointment.client_id == current_user.id,
            Appointment.appointment_time >= now,
            Appointment.appointment_time <= next_24h,
            Appointment.status != "cancelled"
        ).all()

    reminders = []
    for apt in appointments:
        time_until = apt.appointment_time - now
        hours_until = int(time_until.total_seconds() / 3600)
        minutes_until = int((time_until.total_seconds() % 3600) / 60)

        reminders.append({
            "id": apt.id,
            "title": apt.title,
            "type": apt.appointment_type,
            "time": apt.appointment_time.isoformat(),
            "status": apt.status,
            "time_until": f"{hours_until}h {minutes_until}m",
            "is_urgent": hours_until < 2,
            "with": apt.client.full_name if current_user.role == "lawyer" else apt.lawyer.full_name
        })

    return {
        "reminders": reminders,
        "count": len(reminders),
        "message": f"You have {len(reminders)} appointment(s) in the next 24 hours."
    }
