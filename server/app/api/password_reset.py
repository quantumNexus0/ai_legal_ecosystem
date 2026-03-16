"""
Password Reset — generates a reset token and allows password change.
Tokens stored in MongoDB with TTL (expire after 1 hour).
"""
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
import secrets

from app.api.deps import get_db
from app.models import User
from app.core import security

router = APIRouter()


class ForgotPasswordRequest(BaseModel):
    email: EmailStr


class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str


@router.post("/auth/forgot-password")
async def forgot_password(request: ForgotPasswordRequest, db: Session = Depends(get_db)):
    """
    Generate a password reset token.
    In production, this would send an email. For now, the token is returned in the response.
    """
    user = db.query(User).filter(User.email == request.email).first()
    if not user:
        # Don't reveal whether user exists (security best practice)
        return {"message": "If this email exists, a reset link has been sent."}

    token = secrets.token_urlsafe(32)
    expires_at = datetime.utcnow() + timedelta(hours=1)

    try:
        from app.db.mongo import get_database
        mongo_db = get_database()
        if mongo_db is not None:
            # Remove any existing tokens for this user
            await mongo_db.password_reset_tokens.delete_many({"email": request.email})
            # Insert new token
            await mongo_db.password_reset_tokens.insert_one({
                "email": request.email,
                "token": token,
                "expires_at": expires_at,
                "created_at": datetime.utcnow()
            })
            # Create TTL index (idempotent)
            await mongo_db.password_reset_tokens.create_index(
                "expires_at", expireAfterSeconds=0
            )
    except Exception as e:
        print(f"MongoDB error for password reset: {e}")
        raise HTTPException(status_code=500, detail="Service temporarily unavailable")

    # In production: send email with reset link
    # For development: print and return the token
    print(f"[PASSWORD RESET] Token for {request.email}: {token}")

    return {
        "message": "If this email exists, a reset link has been sent.",
        "dev_token": token  # Remove in production!
    }


@router.post("/auth/reset-password")
async def reset_password(request: ResetPasswordRequest, db: Session = Depends(get_db)):
    """Reset password using a valid token."""
    try:
        from app.db.mongo import get_database
        mongo_db = get_database()
        if mongo_db is None:
            raise HTTPException(status_code=503, detail="Service unavailable")

        # Find token
        token_doc = await mongo_db.password_reset_tokens.find_one({
            "token": request.token,
            "expires_at": {"$gt": datetime.utcnow()}
        })

        if not token_doc:
            raise HTTPException(status_code=400, detail="Invalid or expired reset token")

        # Update password
        user = db.query(User).filter(User.email == token_doc["email"]).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        user.hashed_password = security.get_password_hash(request.new_password)
        db.commit()

        # Delete used token
        await mongo_db.password_reset_tokens.delete_one({"token": request.token})

        return {"message": "Password reset successful. You can now login with your new password."}

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
