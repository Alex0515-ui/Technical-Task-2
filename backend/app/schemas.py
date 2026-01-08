from pydantic import BaseModel
from typing import Optional
from models import Category


# Здесь хранятся все схемы моделей, которые нужны для api запросов, чтобы указать какие поля нужны

# Поля для обновления продукта
class Update_Product(BaseModel):
    name: Optional[str] = None
    image: Optional[str] = None
    price: Optional[int] = None
    category: Optional[Category] = None

# Поля для получения всех продуктов
class Get_Products(BaseModel):
    id: int
    name: str
    price: int
    category: Category
    image: str
    
    # Этот класс нам нужен чтобы читать данные из orm объекта напрямую
    class Config:
        from_attributes = True

# Поля для создания продукта
class Create_Product(BaseModel):
    name:str
    image:str
    price:int
    category: Category



