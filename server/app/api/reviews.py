"""
Client Reviews & Ratings — allows clients to review lawyers.
Reviews stored in MongoDB, average rating synced to SQL.
"""
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from sqlalchemy.orm import Session

from app.api.deps import get_db, get_current_user
from app.models import User, LawyerProfile

router = APIRouter()


class ReviewCreate(BaseModel):
    rating: float  # 1.0 - 5.0
    comment: Optional[str] = None


class ReviewOut(BaseModel):
    reviewer_name: str
    rating: float
    comment: Optional[str]
    created_at: str


@router.post("/lawyers/{lawyer_id}/review")
async def submit_review(
    lawyer_id: int,
    review: ReviewCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Submit a review for a lawyer (clients only)."""
    if review.rating < 1 or review.rating > 5:
        raise HTTPException(status_code=400, detail="Rating must be between 1 and 5")

    # Verify lawyer exists
    lawyer = db.query(User).filter(User.id == lawyer_id, User.role == "lawyer").first()
    if not lawyer:
        raise HTTPException(status_code=404, detail="Lawyer not found")

    if current_user.id == lawyer_id:
        raise HTTPException(status_code=400, detail="You cannot review yourself")

    # Save review to MongoDB
    try:
        from app.db.mongo import get_database
        mongo_db = get_database()
        if mongo_db is not None:
            # Check if user already reviewed this lawyer
            existing = await mongo_db.reviews.find_one({
                "lawyer_id": lawyer_id,
                "reviewer_id": current_user.id
            })
            if existing:
                # Update existing review
                await mongo_db.reviews.update_one(
                    {"lawyer_id": lawyer_id, "reviewer_id": current_user.id},
                    {"$set": {
                        "rating": review.rating,
                        "comment": review.comment,
                        "updated_at": datetime.utcnow()
                    }}
                )
            else:
                await mongo_db.reviews.insert_one({
                    "lawyer_id": lawyer_id,
                    "reviewer_id": current_user.id,
                    "reviewer_name": current_user.full_name or current_user.email,
                    "rating": review.rating,
                    "comment": review.comment,
                    "created_at": datetime.utcnow()
                })

            # Recalculate average rating
            pipeline = [
                {"$match": {"lawyer_id": lawyer_id}},
                {"$group": {"_id": None, "avg_rating": {"$avg": "$rating"}, "count": {"$sum": 1}}}
            ]
            result = await mongo_db.reviews.aggregate(pipeline).to_list(1)
            if result:
                new_rating = round(result[0]["avg_rating"], 1)
                # Update SQL lawyer profile
                profile = db.query(LawyerProfile).filter(LawyerProfile.user_id == lawyer_id).first()
                if profile:
                    profile.rating = new_rating
                    db.commit()
    except Exception as e:
        print(f"Review save error: {e}")
        raise HTTPException(status_code=500, detail="Failed to save review")

    return {"status": "success", "message": "Review submitted"}


@router.get("/lawyers/{lawyer_id}/reviews")
async def get_reviews(lawyer_id: int, limit: int = 20):
    """Get all reviews for a lawyer."""
    try:
        from app.db.mongo import get_database
        mongo_db = get_database()
        if mongo_db is None:
            return {"reviews": [], "average_rating": 0, "total": 0}

        cursor = mongo_db.reviews.find(
            {"lawyer_id": lawyer_id},
            {"_id": 0, "reviewer_id": 0}
        ).sort("created_at", -1).limit(limit)
        reviews = await cursor.to_list(length=limit)

        # Convert datetime to string
        for r in reviews:
            if "created_at" in r:
                r["created_at"] = r["created_at"].isoformat()
            if "updated_at" in r:
                r["updated_at"] = r["updated_at"].isoformat()

        # Get average
        pipeline = [
            {"$match": {"lawyer_id": lawyer_id}},
            {"$group": {"_id": None, "avg": {"$avg": "$rating"}, "count": {"$sum": 1}}}
        ]
        agg = await mongo_db.reviews.aggregate(pipeline).to_list(1)
        avg_rating = round(agg[0]["avg"], 1) if agg else 0
        total = agg[0]["count"] if agg else 0

        return {"reviews": reviews, "average_rating": avg_rating, "total": total}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
