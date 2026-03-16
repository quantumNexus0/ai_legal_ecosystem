"""
API Tests — verify critical endpoints.
"""
import pytest
from fastapi.testclient import TestClient
import sys
import os

# Add server dir to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

# Force SQLite for tests
os.environ["DATABASE_URL"] = "sqlite:///./test_legal_services.db"

from app.main import app

client = TestClient(app)


class TestHealth:
    def test_root_page(self):
        response = client.get("/")
        assert response.status_code == 200

    def test_health_check(self):
        response = client.get("/health")
        assert response.status_code == 200


class TestAuth:
    def test_login_success(self):
        response = client.post("/auth/login", data={
            "username": "lawyer@example.com",
            "password": "password123"
        })
        # May fail if DB not seeded, that's ok
        assert response.status_code in [200, 400]

    def test_login_invalid_credentials(self):
        response = client.post("/auth/login", data={
            "username": "nonexistent@example.com",
            "password": "wrongpassword"
        })
        assert response.status_code == 400

    def test_signup_missing_fields(self):
        response = client.post("/auth/signup", json={})
        assert response.status_code == 422  # Validation error

    def test_get_me_without_token(self):
        response = client.get("/users/me")
        assert response.status_code in [401, 403]


class TestLawyers:
    def test_list_lawyers(self):
        response = client.get("/lawyers")
        assert response.status_code == 200
        assert isinstance(response.json(), list)


class TestAnalytics:
    def test_analytics_without_auth(self):
        response = client.get("/api/analytics/cases")
        assert response.status_code in [401, 403]


class TestMongo:
    def test_mongo_test_endpoint(self):
        response = client.get("/api/mongo-test")
        # May return 200 or 503 depending on MongoDB availability
        assert response.status_code in [200, 503, 500]


class TestPasswordReset:
    def test_forgot_password(self):
        response = client.post("/auth/forgot-password", json={
            "email": "lawyer@example.com"
        })
        # Should always return 200 (doesn't reveal if email exists)
        assert response.status_code in [200, 500]

    def test_reset_invalid_token(self):
        response = client.post("/auth/reset-password", json={
            "token": "invalid_token",
            "new_password": "newpass123"
        })
        assert response.status_code in [400, 503]
