from pydantic import BaseModel
from typing import Optional, Dict
from models import Category


# Здесь хранятся все схемы моделей, которые нужны для api запросов, чтобы указать какие поля нужны

# Поля для обновления продукта
class Update_Product(BaseModel):
    name: Optional[str] = None
    image: Optional[str] = None
    price: Optional[int] = None
    category: Optional[Category] = None
    heat: Optional[str] = None
    cool: Optional[str] = None
    water_type: Optional[str] = None
    flow_rate: Optional[str] = None
    filters: Optional[str] = None
    water_modes:  Optional[str] = None

# Поля для получения всех продуктов
class Get_Products(BaseModel):
    id: int
    name: str
    price: int
    category: str
    image: str
    heat: Optional[str] = None
    cool: Optional[str] = None
    water_type: Optional[str] = None
    flow_rate: Optional[str] = None
    filters: Optional[str] = None
    water_modes:  Optional[str] = None
    
    
    # Этот класс нам нужен чтобы читать данные из orm объекта напрямую
    class Config:
        orm_mode = True

# Поля для создания продукта
class Create_Product(BaseModel):
    name:str
    image:str
    price:int
    category: Category
    heat: Optional[str] = None
    cool: Optional[str] = None
    water_type: Optional[str] = None
    flow_rate: Optional[str] = None
    filters: Optional[str] = None
    water_modes:  Optional[str] = None



