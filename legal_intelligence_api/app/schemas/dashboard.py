from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

class StatsBase(BaseModel):
    label: str
    value: str
    icon: Optional[str] = None

class AdminDashboardStats(BaseModel):
    total_users: int
    active_lawyers: int
    total_cases: int
    pending_approvals: int

class LawyerDashboardStats(BaseModel):
    active_cases: int
    total_clients: int
    appointments_today: int
    hours_worked: int

class RecentActivity(BaseModel):
    id: int
    type: str # user, lawyer, case, appointment
    title: str
    subtitle: str
    timestamp: datetime
