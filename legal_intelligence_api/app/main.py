from fastapi import FastAPI, Response, status
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api.routes import router
from app.api.auth import router as auth_router
from app.api.templates import router as templates_router
from app.api.lawyers import router as lawyers_router
from app.api.profile import router as profile_router
from app.api.admin import router as admin_router
from app.api.messages import router as messages_router

from app.services.search_service import search_service
from app.db.base import Base
from app.db.session import engine


app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION
)

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


# ✅ STARTUP EVENT (SAFE PLACE FOR DB + SERVICES)
@app.on_event("startup")
async def startup_event():
    """
    Initialize database tables and services safely on startup
    """
    # Create DB tables
    Base.metadata.create_all(bind=engine)

    # Initialize search service
    search_service.initialize()


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
