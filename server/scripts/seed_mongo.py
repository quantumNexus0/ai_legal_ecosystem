import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configuration
MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("MONGODB_NAME", "legal_services")

async def seed_data():
    print(f"Connecting to MongoDB at {MONGODB_URL}...")
    client = AsyncIOMotorClient(MONGODB_URL)
    db = client[DATABASE_NAME]
    
    # 1. Clear existing data
    collections = ["users", "cases", "appointments", "legal_documents"]
    for coll in collections:
        await db[coll].delete_many({})
    
    # 2. Seed Users (Lawyers and Clients)
    print("Seeding users...")
    lawyer_id = str(ObjectId())
    client_id = str(ObjectId())
    
    users = [
        {
            "_id": ObjectId(lawyer_id),
            "email": "lawyer@example.com",
            "hashed_password": "fake_hashed_password",
            "full_name": "Sarah Jenkins",
            "role": "lawyer",
            "is_active": True,
            "lawyer_profile": {
                "specialization": "Criminal Law",
                "experience_years": 12,
                "rating": 4.8,
                "bio": "Experienced criminal defense attorney with 100+ cases handled."
            },
            "created_at": datetime.datetime.utcnow()
        },
        {
            "_id": ObjectId(client_id),
            "email": "client@example.com",
            "hashed_password": "fake_hashed_password",
            "full_name": "John Doe",
            "role": "user",
            "is_active": True,
            "created_at": datetime.datetime.utcnow()
        }
    ]
    await db.users.insert_many(users)
    
    # 3. Seed Cases
    print("Seeding cases...")
    cases = [
        {
            "title": "State vs. Doe",
            "case_type": "Criminal",
            "description": "Standard defense case for John Doe.",
            "status": "active",
            "lawyer_id": lawyer_id,
            "client_id": client_id,
            "created_at": datetime.datetime.utcnow(),
            "updated_at": datetime.datetime.utcnow()
        }
    ]
    await db.cases.insert_many(cases)

    # 4. Seed Appointments
    print("Seeding appointments...")
    appointments = [
        {
            "title": "Initial Consultation",
            "appointment_type": "Consultation",
            "lawyer_id": lawyer_id,
            "client_id": client_id,
            "appointment_time": datetime.datetime.utcnow() + datetime.timedelta(days=2),
            "status": "scheduled",
            "description": "Discuss legal strategy for the case."
        }
    ]
    await db.appointments.insert_many(appointments)

    # 5. Seed Lawyer Requests
    print("Seeding lawyer_requests...")
    requests = [
        {
            "user_id": client_id,
            "lawyer_id": lawyer_id,
            "message": "I need help with a criminal case.",
            "status": "accepted",
            "created_at": datetime.datetime.utcnow()
        }
    ]
    await db.lawyer_requests.insert_many(requests)

    # 6. Seed Messages
    print("Seeding messages...")
    messages = [
        {
            "sender_id": client_id,
            "receiver_id": lawyer_id,
            "content": "Hello Sarah, when are we meeting?",
            "is_read": True,
            "created_at": datetime.datetime.utcnow()
        },
        {
            "sender_id": lawyer_id,
            "receiver_id": client_id,
            "content": "Hi John, I've scheduled a consultation for Thursday.",
            "is_read": False,
            "created_at": datetime.datetime.utcnow()
        }
    ]
    await db.messages.insert_many(messages)

    # 7. Seed Legal Documents (Existing)
    print("Seeding legal_documents...")
    documents = [
        {
            "title": "Standard Non-Disclosure Agreement",
            "category": "Corporate",
            "content": "This Non-Disclosure Agreement...",
            "version": "1.0",
            "created_at": datetime.datetime.utcnow()
        }
    ]
    await db.legal_documents.insert_many(documents)
    
    print("Successfully seeded Mirror SQL data in MongoDB!")
    client.close()

if __name__ == "__main__":
    from bson import ObjectId
    asyncio.run(seed_data())
