from datetime import datetime
from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_, and_

from app.api import deps
from app.models import Message as MessageModel
from app.models import User as UserModel
from app.schemas import message as message_schemas

router = APIRouter()

@router.get("/messages/conversation/{other_user_id}", response_model=List[message_schemas.Message])
def get_conversation(
    other_user_id: int,
    db: Session = Depends(deps.get_db),
    current_user: UserModel = Depends(deps.get_current_user),
) -> Any:
    """
    Get all messages between current user and another user.
    """
    messages = db.query(MessageModel).filter(
        or_(
            and_(MessageModel.sender_id == current_user.id, MessageModel.receiver_id == other_user_id),
            and_(MessageModel.sender_id == other_user_id, MessageModel.receiver_id == current_user.id)
        )
    ).order_by(MessageModel.created_at.asc()).all()
    
    # Mark messages as read
    unread_messages = [m for m in messages if m.receiver_id == current_user.id and not m.is_read]
    for msg in unread_messages:
        msg.is_read = True
    if unread_messages:
        db.commit()
        
    return messages

@router.post("/messages", response_model=message_schemas.Message)
def send_message(
    *,
    db: Session = Depends(deps.get_db),
    current_user: UserModel = Depends(deps.get_current_user),
    message_in: message_schemas.MessageCreate,
) -> Any:
    """
    Send a new message.
    """
    # Verify receiver exists
    receiver = db.query(UserModel).filter(UserModel.id == message_in.receiver_id).first()
    if not receiver:
        raise HTTPException(status_code=404, detail="Receiver not found")
        
    message = MessageModel(
        sender_id=current_user.id,
        receiver_id=message_in.receiver_id,
        content=message_in.content
    )
    db.add(message)
    db.commit()
    db.refresh(message)
    return message

@router.get("/messages/chats", response_model=List[Any])
def get_chats(
    db: Session = Depends(deps.get_db),
    current_user: UserModel = Depends(deps.get_current_user),
) -> Any:
    """
    Get a list of users the current user has chatted with.
    """
    # This is a bit complex in SQL, for now let's do a simple version
    # Get all distinct pairs of (sender, receiver) involving current_user
    sent_to = db.query(MessageModel.receiver_id).filter(MessageModel.sender_id == current_user.id).distinct().all()
    received_from = db.query(MessageModel.sender_id).filter(MessageModel.receiver_id == current_user.id).distinct().all()
    
    user_ids = set([u[0] for u in sent_to] + [u[0] for u in received_from])
    
    chats = []
    for uid in user_ids:
        user = db.query(UserModel).filter(UserModel.id == uid).first()
        if user:
            # Get last message
            last_msg = db.query(MessageModel).filter(
                or_(
                    and_(MessageModel.sender_id == current_user.id, MessageModel.receiver_id == uid),
                    and_(MessageModel.sender_id == uid, MessageModel.receiver_id == current_user.id)
                )
            ).order_by(MessageModel.created_at.desc()).first()
            
            chats.append({
                "id": uid,
                "name": user.full_name or user.email,
                "email": user.email,
                "role": user.role,
                "profile_image_url": user.profile_image_url,
                "last_message": last_msg.content if last_msg else None,
                "last_message_time": last_msg.created_at if last_msg else None,
                "unread_count": db.query(MessageModel).filter(
                    MessageModel.sender_id == uid,
                    MessageModel.receiver_id == current_user.id,
                    MessageModel.is_read == False
                ).count()
            })
            
    # Sort chats by last message time
    chats.sort(key=lambda x: x["last_message_time"] or datetime.min, reverse=True)
    return chats
