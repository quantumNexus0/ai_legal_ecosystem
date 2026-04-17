"""
websocket_manager.py — Room-based WebSocket connection manager with proper cleanup.
Supports multiple connections per room, user mapping, and dead-connection pruning.
"""
from fastapi import WebSocket
from typing import Dict, List
import json


class ConnectionManager:
    def __init__(self):
        # room_id -> list of active connections
        self.active_connections: Dict[int, List[WebSocket]] = {}
        # websocket -> user_id mapping
        self.user_map: Dict[WebSocket, int] = {}

    async def connect(self, websocket: WebSocket, room_id: int, user_id: int):
        await websocket.accept()
        if room_id not in self.active_connections:
            self.active_connections[room_id] = []
        self.active_connections[room_id].append(websocket)
        self.user_map[websocket] = user_id

    def disconnect(self, websocket: WebSocket, room_id: int):
        if room_id in self.active_connections:
            self.active_connections[room_id] = [
                ws for ws in self.active_connections[room_id] if ws != websocket
            ]
            if not self.active_connections[room_id]:
                del self.active_connections[room_id]
        self.user_map.pop(websocket, None)

    async def broadcast_to_room(self, room_id: int, message: dict, exclude: WebSocket = None):
        """Send message to all connections in a room."""
        connections = self.active_connections.get(room_id, [])
        dead = []
        for ws in connections:
            if ws == exclude:
                continue
            try:
                await ws.send_json(message)
            except Exception:
                dead.append(ws)
        # Clean up dead connections
        for ws in dead:
            self.disconnect(ws, room_id)

    def get_online_users(self, room_id: int) -> List[int]:
        return [self.user_map[ws] for ws in self.active_connections.get(room_id, [])]


manager = ConnectionManager()
