from sqlalchemy import Boolean, Column, Integer, String, Enum
from sqlalchemy.orm import relationship
from app.models.base_class import Base
from app.core.config import settings


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, index=True)
    role = Column(Enum("admin", "cliente"), default="cliente")
    is_active = Column(Boolean(), default=True)
    is_superuser = Column(Boolean(), default=False)

    orders = relationship("Order", back_populates="user")
    comments = relationship("Comment", back_populates="user")
    feedback = relationship("Feedback", back_populates="user")
