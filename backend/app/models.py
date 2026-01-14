from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Integer, String, JSON, ForeignKey
from enum import Enum
from database import engine
from typing import Literal

# Функция для создания моделей в sqlalchemy
Base = declarative_base()

# Главная модель продукта в бд
class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    price = Column(Integer)
    image = Column(String)
    product_type = Column(String)

    __mapper_args__ ={
        "polymorphic_identity": "product",
        "polymorphic_on": product_type
    }
    
class Dispenser(Product):
    __tablename__ = "dispancer"
    id = Column(Integer, ForeignKey("products.id"), primary_key=True)
    heat = Column(String)
    cool = Column(String)
    __mapper_args__ = {
        "polymorphic_identity": "ДИСПЕНСЕРЫ"
    }

class Purifier(Product):
    __tablename__ = "purifier"
    id = Column(Integer, ForeignKey("products.id"), primary_key=True)
    filters = Column(String)
    water_modes = Column(String)
    __mapper_args__ = {
        "polymorphic_identity": "ПУРИФАЙЕР"
        }

class Fountain(Product):
    __tablename__ = "fountain"
    id = Column(Integer, ForeignKey("products.id"), primary_key=True)
    water_type = Column(String)
    flow_rate = Column(String)
    __mapper_args__ = {
        "polymorphic_identity": "ПИТЬЕВОЙ ФОНТАН"
    }

# Создание модели в бд если ее не сущетсвует
Base.metadata.create_all(bind=engine)