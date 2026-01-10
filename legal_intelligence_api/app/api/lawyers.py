from typing import Any, List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api import deps
from app.models import User
from app.models import LawyerProfile
from app.models import Case
from app.models import Appointment
from app.models import LawyerRequest
from app.schemas import lawyer as lawyer_schemas
from app.schemas import dashboard as dashboard_schemas
from app.schemas import case as case_schemas
from app.schemas import appointment as appointment_schemas
from sqlalchemy import func

router = APIRouter()

@router.get("/lawyers", response_model=List[lawyer_schemas.LawyerPublic])
def get_lawyers(
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    Fetch all active lawyers for the landing page.
    """
    # Join User with LawyerProfile
    results = db.query(User, LawyerProfile).join(
        LawyerProfile, User.id == LawyerProfile.user_id
    ).filter(
        User.role == "lawyer",
        User.is_active == True
    ).all()
    
    # Map results to LawyerPublic schema
    lawyers = []
    for user, profile in results:
        lawyers.append(lawyer_schemas.LawyerPublic(
            id=user.id,
            full_name=user.full_name or "Unknown",
            email=user.email,
            specialization=profile.specialization,
            experience_years=profile.experience_years,
            rating=profile.rating,
            cases_handled=profile.cases_handled,
            profile_image_url=profile.profile_image_url,
            office_address=profile.office_address,
            phone=user.phone
        ))
    
    return lawyers

@router.put("/users/me/lawyer-profile", response_model=lawyer_schemas.LawyerPublic)
def update_lawyer_profile(
    *,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
    profile_in: lawyer_schemas.LawyerProfileUpdate,
) -> Any:
    """
    Update lawyer profile information (authenticated lawyers only).
    """
    from fastapi import HTTPException
    
    if current_user.role != "lawyer":
        raise HTTPException(status_code=403, detail="Only lawyers can update lawyer profiles")
    
    # Get or create LawyerProfile
    profile = db.query(LawyerProfile).filter(LawyerProfile.user_id == current_user.id).first()
    if not profile:
        profile = LawyerProfile(user_id=current_user.id)
        db.add(profile)
    
    # Update fields
    if profile_in.specialization is not None:
        profile.specialization = profile_in.specialization
    if profile_in.experience_years is not None:
        profile.experience_years = profile_in.experience_years
    if profile_in.profile_image_url is not None:
        profile.profile_image_url = profile_in.profile_image_url
    if profile_in.office_address is not None:
        profile.office_address = profile_in.office_address
    
    db.commit()
    db.refresh(profile)
    
    # Return combined data
    return lawyer_schemas.LawyerPublic(
        id=current_user.id,
        full_name=current_user.full_name or "Unknown",
        email=current_user.email,
        specialization=profile.specialization,
        experience_years=profile.experience_years,
        rating=profile.rating,
        cases_handled=profile.cases_handled,
        profile_image_url=profile.profile_image_url,
        office_address=profile.office_address,
        phone=current_user.phone
    )

@router.get("/lawyers/me/stats", response_model=dashboard_schemas.LawyerDashboardStats)
def get_lawyer_stats(
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    # If user is a client, return stats relevant to them
    if current_user.role == "lawyer":
        active_cases = db.query(Case).filter(Case.lawyer_id == current_user.id, Case.status == "active").count()
        total_clients = db.query(Case.client_id).filter(Case.lawyer_id == current_user.id).distinct().count()
        appointments_today = db.query(Appointment).filter(
            Appointment.lawyer_id == current_user.id,
            func.date(Appointment.appointment_time) == func.current_date()
        ).count()
    else:
        # Regular user (client)
        active_cases = db.query(Case).filter(Case.client_id == current_user.id, Case.status == "active").count()
        total_clients = db.query(Case.lawyer_id).filter(Case.client_id == current_user.id).distinct().count()
        appointments_today = db.query(Appointment).filter(
            Appointment.client_id == current_user.id,
            func.date(Appointment.appointment_time) == func.current_date()
        ).count()
    
    # Mock hours worked for now
    hours_worked = 156 if current_user.role == "lawyer" else 0
    
    return {
        "active_cases": active_cases,
        "total_clients": total_clients,
        "appointments_today": appointments_today,
        "hours_worked": hours_worked
    }

@router.get("/lawyers/me/cases", response_model=List[case_schemas.Case])
def get_lawyer_cases(
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    """
    Get cases for the current user (either as lawyer or client).
    """
    if current_user.role == "lawyer":
        query = db.query(Case).filter(Case.lawyer_id == current_user.id)
    else:
        query = db.query(Case).filter(Case.client_id == current_user.id)
        
    cases = query.all()
    
    # Enrich with names
    results = []
    for c in cases:
        case_dict = {
            "id": c.id,
            "title": c.title,
            "type": c.case_type,
            "description": c.description,
            "status": c.status.capitalize() if c.status else "Active",
            "nextHearing": c.next_hearing.strftime("%Y-%m-%d") if c.next_hearing else "Not Scheduled",
            "lawyer": c.lawyer.full_name if c.lawyer else "Unknown",
            "client": c.client.full_name if c.client else "Unknown",
            "lawyer_id": c.lawyer_id,
            "client_id": c.client_id,
            "created_at": c.created_at
        }
        results.append(case_dict)
        
    return results

@router.post("/lawyers/{lawyer_id}/request")
def send_lawyer_request(
    lawyer_id: int,
    message: str,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    lawyer = db.query(User).filter(User.id == lawyer_id, User.role == "lawyer").first()
    if not lawyer:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Lawyer not found")
    
    request = LawyerRequest(
        user_id=current_user.id,
        lawyer_id=lawyer_id,
        message=message
    )
    db.add(request)
    db.commit()
    return {"status": "success", "message": "Request sent to lawyer"}

@router.get("/lawyers/me/appointments", response_model=List[appointment_schemas.Appointment])
def get_lawyer_appointments(
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    """
    Get appointments for the current user (either as lawyer or client).
    """
    if current_user.role == "lawyer":
        query = db.query(Appointment).filter(Appointment.lawyer_id == current_user.id)
    else:
        query = db.query(Appointment).filter(Appointment.client_id == current_user.id)
        
    appointments = query.all()
    
    # Enrich with names
    results = []
    for a in appointments:
        app_dict = {
            "id": a.id,
            "title": a.title,
            "type": a.appointment_type,
            "date": a.appointment_time.strftime("%B %d, %Y"),
            "time": a.appointment_time.strftime("%I:%M %p"),
            "with_": a.client.full_name if current_user.role == "lawyer" else a.lawyer.full_name,
            "status": a.status.capitalize() if a.status else "Confirmed",
            "description": a.description,
            "lawyer_id": a.lawyer_id,
            "client_id": a.client_id
        }
        results.append(app_dict)
        
    return results

@router.post("/lawyers/me/cases", response_model=case_schemas.Case)
def create_lawyer_case(
    *,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
    case_in: case_schemas.CaseCreate,
) -> Any:
    """
    Create a new case (lawyers only).
    """
    from fastapi import HTTPException
    if current_user.role != "lawyer":
        raise HTTPException(status_code=403, detail="Only lawyers can create cases")
    
    # Verify client exists
    client = db.query(User).filter(User.id == case_in.client_id).first()
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
        
    case = Case(
        title=case_in.title,
        case_type=case_in.case_type,
        description=case_in.description,
        lawyer_id=current_user.id,
        client_id=case_in.client_id,
        status="active"
    )
    db.add(case)
    db.commit()
    db.refresh(case)
    
    return {
        "id": case.id,
        "title": case.title,
        "type": case.case_type,
        "description": case.description,
        "status": case.status.capitalize(),
        "nextHearing": "Not Scheduled",
        "lawyer": current_user.full_name,
        "client": client.full_name,
        "lawyer_id": case.lawyer_id,
        "client_id": case.client_id,
        "created_at": case.created_at
    }

@router.post("/lawyers/me/appointments", response_model=appointment_schemas.Appointment)
def create_lawyer_appointment(
    *,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
    appointment_in: appointment_schemas.AppointmentCreate,
) -> Any:
    """
    Create a new appointment (lawyers only).
    """
    from fastapi import HTTPException
    if current_user.role != "lawyer":
        raise HTTPException(status_code=403, detail="Only lawyers can create appointments")
    
    # Verify client exists
    client = db.query(User).filter(User.id == appointment_in.client_id).first()
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
        
    appointment = Appointment(
        title=appointment_in.title,
        appointment_type=appointment_in.appointment_type,
        appointment_time=appointment_in.appointment_time,
        description=appointment_in.description,
        lawyer_id=current_user.id,
        client_id=appointment_in.client_id,
        status="scheduled"
    )
    db.add(appointment)
    db.commit()
    db.refresh(appointment)
    
    return {
        "id": appointment.id,
        "title": appointment.title,
        "type": appointment.appointment_type,
        "date": appointment.appointment_time.strftime("%B %d, %Y"),
        "time": appointment.appointment_time.strftime("%I:%M %p"),
        "with_": client.full_name,
        "status": appointment.status.capitalize(),
        "description": appointment.description,
        "lawyer_id": appointment.lawyer_id,
        "client_id": appointment.client_id
    }

@router.delete("/lawyers/me/cases/{case_id}")
def delete_lawyer_case(
    case_id: int,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    """
    Delete a case (lawyers only, must handle case).
    """
    from fastapi import HTTPException
    
    if current_user.role != "lawyer":
        raise HTTPException(status_code=403, detail="Only lawyers can delete cases")
        
    case = db.query(Case).filter(Case.id == case_id).first()
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
        
    if case.lawyer_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this case")
        
    db.delete(case)
    db.commit()
    return {"status": "success", "message": "Case deleted"}

@router.delete("/lawyers/me/appointments/{appointment_id}")
def delete_lawyer_appointment(
    appointment_id: int,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    """
    Delete an appointment (lawyers only, must handle appointment).
    """
    from fastapi import HTTPException
    
    if current_user.role != "lawyer":
        raise HTTPException(status_code=403, detail="Only lawyers can delete appointments")
        
    appointment = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
        
    if appointment.lawyer_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this appointment")
        
    db.delete(appointment)
    db.commit()
    return {"status": "success", "message": "Appointment deleted"}
