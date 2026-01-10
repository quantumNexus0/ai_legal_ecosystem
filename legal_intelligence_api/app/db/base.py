# Import all the models, so that Base has them before being
# used by Alembic or partial imports
from app.db.base_class import Base  # noqa
from app.models.all_models import User, LawyerProfile, Case, Appointment, LawyerRequest, Message  # noqa
