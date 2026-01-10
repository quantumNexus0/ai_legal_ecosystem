from sqlalchemy import Boolean, Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.base_class import Base

class User(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255))
    role = Column(String(50), default="user")
    is_active = Column(Boolean(), default=True)
    profile_image_url = Column(String(512), nullable=True)
    phone = Column(String(20), nullable=True)
    
    lawyer_profile = relationship("LawyerProfile", back_populates="user", uselist=False)
    
    # Relationships with explicit foreign_keys
    cases_as_lawyer = relationship("Case", foreign_keys="Case.lawyer_id", back_populates="lawyer")
    appointments_as_lawyer = relationship("Appointment", foreign_keys="Appointment.lawyer_id", back_populates="lawyer")
    requests_received = relationship("LawyerRequest", foreign_keys="LawyerRequest.lawyer_id", back_populates="lawyer")
    
    cases_as_client = relationship("Case", foreign_keys="Case.client_id", back_populates="client")
    appointments_as_client = relationship("Appointment", foreign_keys="Appointment.client_id", back_populates="client")
    requests_sent = relationship("LawyerRequest", foreign_keys="LawyerRequest.user_id", back_populates="user")

class LawyerProfile(Base):
    __tablename__ = "lawyer_profile"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id"), unique=True, nullable=False)
    specialization = Column(String(255), nullable=True)
    experience_years = Column(Integer, nullable=True)
    rating = Column(Float, default=0.0)
    cases_handled = Column(Integer, default=0)
    profile_image_url = Column(String(512), nullable=True)
    office_address = Column(String(512), nullable=True)
    
    user = relationship("User", back_populates="lawyer_profile")

class Case(Base):
    __tablename__ = "case"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    case_type = Column(String(100), nullable=True) # e.g., "Civil", "Criminal"
    description = Column(String(1000))
    status = Column(String(50), default="active")
    next_hearing = Column(DateTime, nullable=True)
    lawyer_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    client_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    lawyer = relationship("User", foreign_keys=[lawyer_id], back_populates="cases_as_lawyer")
    client = relationship("User", foreign_keys=[client_id], back_populates="cases_as_client")

class Appointment(Base):
    __tablename__ = "appointment"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=True)
    appointment_type = Column(String(100), nullable=True) # e.g., "Consultation", "Hearing"
    lawyer_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    client_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    appointment_time = Column(DateTime, nullable=False)
    status = Column(String(50), default="scheduled")
    description = Column(String(1000))
    
    lawyer = relationship("User", foreign_keys=[lawyer_id], back_populates="appointments_as_lawyer")
    client = relationship("User", foreign_keys=[client_id], back_populates="appointments_as_client")

class LawyerRequest(Base):
    __tablename__ = "lawyer_request"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    lawyer_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    message = Column(String(1000))
    status = Column(String(50), default="pending")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    user = relationship("User", foreign_keys=[user_id], back_populates="requests_sent")
    lawyer = relationship("User", foreign_keys=[lawyer_id], back_populates="requests_received")

class Message(Base):
    __tablename__ = "message"
    id = Column(Integer, primary_key=True, index=True)
    sender_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    receiver_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    content = Column(String(1000), nullable=False)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
