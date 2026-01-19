from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Integer, String, ForeignKey, Enum as SQLEnum
from database import engine
from enum import Enum

Base = declarative_base()


class ProductCategory(str, Enum):
    DISPENSER = "ДИСПЕНСЕРЫ"
    PURIFIER = "ПУРИФАЙЕР"
    FOUNTAIN = "ПИТЬЕВОЙ ФОНТАН"

class Admin(Base):
    __tablename__ = "admins"
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True)
    password = Column(String)

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    price = Column(Integer, nullable=False)
    image = Column(String)

    product_type = Column(
        SQLEnum(ProductCategory, native_enum=False), 
        nullable=False
    )

    __mapper_args__ = {
        "polymorphic_on": product_type,
    }



class Dispenser(Product):
    __tablename__ = "dispenser"

    id = Column(Integer, ForeignKey("products.id"), primary_key=True)
    heat = Column(String, nullable=False)
    cool = Column(String, nullable=False)

    __mapper_args__ = {
        "polymorphic_identity": ProductCategory.DISPENSER,
    }


class Purifier(Product):
    __tablename__ = "purifier"

    id = Column(Integer, ForeignKey("products.id"), primary_key=True)
    filters = Column(String, nullable=False)
    water_modes = Column(String, nullable=False)

    __mapper_args__ = {
        "polymorphic_identity": ProductCategory.PURIFIER,
    }


class Fountain(Product):
    __tablename__ = "fountain"

    id = Column(Integer, ForeignKey("products.id"), primary_key=True)
    water_type = Column(String, nullable=False)
    flow_rate = Column(String, nullable=False)

    __mapper_args__ = {
        "polymorphic_identity": ProductCategory.FOUNTAIN,
    }


Base.metadata.create_all(bind=engine)
