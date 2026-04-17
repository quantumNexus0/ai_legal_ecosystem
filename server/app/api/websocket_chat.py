"""
websocket_chat.py — Secure WebSocket chat with token passed in FIRST MESSAGE body
(not in URL query param) to prevent JWT leaking into server access logs.
"""
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from sqlalchemy.orm import Session
from datetime import datetime

from app.db.session import SessionLocal
from app.api.deps import get_current_user_from_token
from app.websocket_manager import manager

router = APIRouter()


def verify_token(token: str, db: Session):
    """Validate JWT and return the User object, or None on failure."""
    try:
        return get_current_user_from_token(token=token, db=db)
    except Exception:
        return None


@router.websocket("/ws/chat/{room_id}")
async def websocket_chat(websocket: WebSocket, room_id: int):
    """
    Secure WebSocket endpoint for real-time room-based chat.

    Auth flow (Issue 7 fix):
      • Client connects with NO token in the URL.
      • First message MUST be: {"type": "auth", "token": "<JWT>"}
      • If auth fails → close with code 4001.
      • Subsequent messages: {"content": "Hello!"} are broadcast to the room.

    Connect: ws://localhost:8000/ws/chat/{room_id}
    """
    await websocket.accept()

    # ── Step 1: authenticate via first message (not URL) ────────────────────
    db = SessionLocal()
    try:
        auth_msg = await websocket.receive_json()
        if auth_msg.get("type") != "auth":
            await websocket.close(code=4001)
            return

        token = auth_msg.get("token", "")
        user = verify_token(token, db)
        if not user:
            await websocket.close(code=4001)
            return
    except Exception:
        await websocket.close(code=4001)
        return
    finally:
        db.close()

    # ── Step 2: register connection in manager ───────────────────────────────
    # (websocket is already accepted; manager.connect() won't double-accept)
    if room_id not in manager.active_connections:
        manager.active_connections[room_id] = []
    manager.active_connections[room_id].append(websocket)
    manager.user_map[websocket] = user.id

    try:
        while True:
            data = await websocket.receive_json()
            content = data.get("content", "").strip()

            if not content:
                await websocket.send_json({"error": "content is required"})
                continue

            db = SessionLocal()
            try:
                from app.models.all_models import Message
                msg = Message(
                    sender_id=user.id,
                    receiver_id=room_id,   # room_id doubles as conversation partner id
                    content=content,
                    is_read=False,
                )
                db.add(msg)
                db.commit()
                db.refresh(msg)

                message_out = {
                    "id": msg.id,
                    "sender_id": user.id,
                    "content": content,
                    "timestamp": msg.created_at.isoformat() if msg.created_at else datetime.utcnow().isoformat(),
                    "type": "message",
                }

                # Broadcast to everyone in room except sender
                await manager.broadcast_to_room(room_id, message_out, exclude=websocket)
                # Confirm to sender
                await websocket.send_json({**message_out, "status": "sent"})
            finally:
                db.close()

    except WebSocketDisconnect:
        manager.disconnect(websocket, room_id)


@router.get("/chat/online/{room_id}")
async def get_online_users(room_id: int):
    """Return list of user IDs currently online in a room."""
    return {"room_id": room_id, "online_users": manager.get_online_users(room_id)}
