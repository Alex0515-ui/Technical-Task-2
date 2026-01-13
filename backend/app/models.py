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

    # Для диспенсера поля
    heat = Column(String, nullable=True)
    cool = Column(String, nullable=True)

    # Для Питьевого фонтана поля
    water_type = Column(String, nullable=True)
    flow_rate = Column(String, nullable=True)
    
    # Для пурифайера поля
    filters = Column(String, nullable=True)
    water_modes = Column(String, nullable=True)


# Создание модели в бд если ее не сущетсвует
Base.metadata.create_all(bind=engine)