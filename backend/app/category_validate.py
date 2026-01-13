from fastapi import HTTPException
from models import Category
from schemas import Create_Product

# Функция валидатор для категории и его полей
def validation_by_category(product):
    if product.category == Category.Dispancer:
        required_fields = {"heat", "cool"}
        forbidden = {"water_type", "flow_rate", "filters", "water_modes"}
    elif product.category == Category.Fountain:
        required_fields = {"water_type", "flow_rate"}
        forbidden = {"filters", "water_modes", "heat", "cool"}
    elif product.category == Category.Purifier:
        required_fields = {"filters", "water_modes"}
        forbidden = {"water_type", "flow_rate", "heat", "cool"}
    else:
        raise HTTPException(status_code=400, detail=f"Категории {product.category} не существует")

    # Работа с ORM объектом
    for field in required_fields:
        if not getattr(product, field, None):
            raise HTTPException(status_code=400, detail=f"Поле {field} обязательно для категории {product.category}")

    for field in forbidden:
        if getattr(product, field, None) is not None:
            raise HTTPException(status_code=400, detail=f"Поле {field} недопустимо для категории {product.category}")
