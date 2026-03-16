"""
WebSocket Chat — real-time messaging between lawyers and clients.
Messages stored in SQL `message` table.
"""
from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from sqlalchemy.orm import Session
from typing import Dict, List
from datetime import datetime

from app.api.deps import get_db
from app.models import User
from app.models.all_models import Message

router = APIRouter()


class ConnectionManager:
    """Manages active WebSocket connections."""

    def __init__(self):
        self.active_connections: Dict[int, WebSocket] = {}

    async def connect(self, user_id: int, websocket: WebSocket):
        await websocket.accept()
        self.active_connections[user_id] = websocket

    def disconnect(self, user_id: int):
        self.active_connections.pop(user_id, None)

    async def send_personal_message(self, message: dict, user_id: int):
        if user_id in self.active_connections:
            await self.active_connections[user_id].send_json(message)

    def is_online(self, user_id: int) -> bool:
        return user_id in self.active_connections


manager = ConnectionManager()


@router.websocket("/ws/chat/{user_id}")
async def websocket_chat(websocket: WebSocket, user_id: int):
    """
    WebSocket endpoint for real-time chat.
    Connect: ws://localhost:8000/ws/chat/{user_id}
    Send JSON: {"receiver_id": 123, "content": "Hello!"}
    """
    await manager.connect(user_id, websocket)
    try:
        while True:
            data = await websocket.receive_json()
            receiver_id = data.get("receiver_id")
            content = data.get("content", "")

            if not receiver_id or not content:
                await websocket.send_json({"error": "receiver_id and content required"})
                continue

            # Save message to SQL database
            from app.db.session import SessionLocal
            db = SessionLocal()
            try:
                msg = Message(
                    sender_id=user_id,
                    receiver_id=receiver_id,
                    content=content,
                    is_read=False
                )
                db.add(msg)
                db.commit()
                db.refresh(msg)

                message_out = {
                    "id": msg.id,
                    "sender_id": user_id,
                    "receiver_id": receiver_id,
                    "content": content,
                    "is_read": False,
                    "created_at": msg.created_at.isoformat() if msg.created_at else datetime.utcnow().isoformat(),
                    "type": "message"
                }

                # Send to receiver if online
                await manager.send_personal_message(message_out, receiver_id)
                # Send confirmation back to sender
                await websocket.send_json({**message_out, "status": "sent"})
            finally:
                db.close()

    except WebSocketDisconnect:
        manager.disconnect(user_id)


@router.get("/chat/online")
async def get_online_users():
    """Check which users are currently online."""
    return {"online_users": list(manager.active_connections.keys())}
