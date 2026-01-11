from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Integer, String, JSON
from enum import Enum
from database import engine

# Функция для создания моделей в sqlalchemy
Base = declarative_base()

# Выбор из категорий
class Category(str, Enum):
    Purifier = "ПУРИФАЙЕР"
    Fountain = "ПИТЬЕВОЙ ФОНТАН"
    Dispancer = "ДИСПЕНСЕРЫ"

# Главная модель продукта в бд
class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    price = Column(Integer)
    image = Column(String)
    category = Column(String)

    details = Column(JSON, default={})

# Создание модели в бд если ее не сущетсвует
Base.metadata.create_all(bind=engine)