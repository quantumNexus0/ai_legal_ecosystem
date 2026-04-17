from fastapi import FastAPI, Response, status, Request
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
import mimetypes

# Fix MIME types on Windows (Firefox is strict about this)
mimetypes.init()
mimetypes.add_type('application/javascript', '.js')
mimetypes.add_type('text/css', '.css')
mimetypes.add_type('image/svg+xml', '.svg')

from app.core.config import settings
from app.api.routes import router
from app.api.auth import router as auth_router
from app.api.templates import router as templates_router
from app.api.lawyers import router as lawyers_router
from app.api.profile import router as profile_router
from app.api.admin import router as admin_router
from app.api.messages import router as messages_router
from app.api.mongo_test import router as mongo_test_router
from app.api.reviews import router as reviews_router
from app.api.password_reset import router as password_reset_router
from app.api.websocket_chat import router as ws_chat_router
from app.api.reminders import router as reminders_router
from app.api.documents import router as documents_router
from app.api.analytics import router as analytics_router
from app.api.nyaya_ai import router as nyaya_ai_router

from app.services.search_service import search_service
from app.db.base import Base
from app.db.session import engine

# Rate Limiting
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

limiter = Limiter(key_func=get_remote_address)



app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION
)

# Attach rate limiter to app
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routes
app.include_router(router)
app.include_router(auth_router, tags=["auth"])
app.include_router(lawyers_router, tags=["lawyers"])
app.include_router(profile_router, tags=["profile"])
app.include_router(admin_router, tags=["admin"])
app.include_router(templates_router, tags=["templates"])
app.include_router(messages_router, tags=["messages"])
app.include_router(mongo_test_router, prefix="/api", tags=["system"])
app.include_router(reviews_router, tags=["reviews"])
app.include_router(password_reset_router, tags=["auth"])
app.include_router(ws_chat_router, tags=["chat"])
app.include_router(reminders_router, tags=["reminders"])
app.include_router(documents_router, tags=["documents"])
app.include_router(analytics_router, tags=["analytics"])
app.include_router(nyaya_ai_router, prefix="/api/nyaya", tags=["Nyaya AI"])


# Custom StaticFiles class to force correct MIME types for Firefox compatibility
from starlette.responses import Response
from starlette.staticfiles import StaticFiles as BaseStaticFiles

class CustomStaticFiles(BaseStaticFiles):
    async def get_response(self, path: str, scope):
        response = await super().get_response(path, scope)
        
        # Force correct MIME types based on file extension
        if isinstance(response, Response):
            if path.endswith('.css'):
                response.headers['content-type'] = 'text/css; charset=utf-8'
            elif path.endswith('.js'):
                response.headers['content-type'] = 'application/javascript; charset=utf-8'
            elif path.endswith('.svg'):
                response.headers['content-type'] = 'image/svg+xml'
            elif path.endswith('.woff2'):
                response.headers['content-type'] = 'font/woff2'
            elif path.endswith('.woff'):
                response.headers['content-type'] = 'font/woff'
        
        return response

# Mount Template Library at a subpath to support relative asset paths (e.g. ../../legalzoomcdn.net)
templates_root = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "..", "shared", "templates")
if os.path.exists(templates_root):
    app.mount("/template-portal", CustomStaticFiles(directory=templates_root), name="template-portal")

# Mount Nyaya-AI Client
nyaya_ai_root = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "..", "client", "nyaya-ai")
if os.path.exists(nyaya_ai_root):
    app.mount("/nyaya", CustomStaticFiles(directory=nyaya_ai_root), name="nyaya-ai")


from app.db.mongo import connect_to_mongo, close_mongo_connection

# ✅ STARTUP EVENT (SAFE PLACE FOR DB + SERVICES)
@app.on_event("startup")
async def startup_event():
    """
    Initialize database tables and services safely on startup
    """
    # Create DB tables
    Base.metadata.create_all(bind=engine)

    # Connect to MongoDB
    await connect_to_mongo()

    # Initialize Vector DB (ChromaDB)
    from app.services.vector_db import vector_service
    vector_service.initialize()

    # Initialize search service
    search_service.initialize()

@app.on_event("shutdown")
async def shutdown_event():
    """
    Close services gracefully on shutdown
    """
    await close_mongo_connection()


@app.get("/", response_class=HTMLResponse, include_in_schema=False)
async def root():
    return """
    <!DOCTYPE html>
    <html>
        <head>
            <title>AI Legal Ecosystem API</title>
            <style>
                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    background-color: #f0f2f5;
                }
                .container {
                    background: white;
                    padding: 2rem 4rem;
                    border-radius: 12px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    text-align: center;
                }
                h1 { color: #2563eb; }
                .btn {
                    display: inline-block;
                    margin-top: 1rem;
                    background-color: #2563eb;
                    color: white;
                    padding: 0.75rem 1.5rem;
                    text-decoration: none;
                    border-radius: 6px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>AI Legal Ecosystem API</h1>
                <p>Backend services are running successfully.</p>
                <a href="/docs" class="btn">View API Documentation</a>
            </div>
        </body>
    </html>
    """


@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return Response(status_code=status.HTTP_204_NO_CONTENT)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
