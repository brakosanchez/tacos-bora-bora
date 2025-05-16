from sqlalchemy import Column, Integer, String, Float, Boolean, Enum
from sqlalchemy.orm import relationship
from app.models.base_class import Base


class Menu(Base):
    __tablename__ = "menu"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    description = Column(String)
    price = Column(Float, nullable=False)
    image = Column(String)
    category = Column(Enum("tacos", "bebidas", "postres", "otros"))
    is_available = Column(Boolean, default=True)

    orders = relationship("OrderItem", back_populates="menu_item")
