from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas import ProductBase, DispenserBase, PurifierBase, FountainBase
from fastapi.middleware.cors import CORSMiddleware
from database import get_db
from models import Product, Dispenser, Purifier, Fountain
from seed import seed_db
from typing import Literal, Optional
from transform import product_to_schema

app = FastAPI()

# Доступные домены
origins = [
    "http://localhost:5173",    
    "http://127.0.0.1:5173",
]
# Подключение CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

seed_db()


# Запрос на получение всех продуктов
@app.get("/products", response_model=list[ProductBase])
def get_all_products(product_type : Optional[Literal["ДИСПЕНСЕРЫ", "ПИТЬЕВОЙ ФОНТАН", "ПУРИФАЙЕР"]] = None, db: Session = Depends(get_db)):
    response = db.query(Product)
    # query параметр для фильтрации по категории
    if product_type:
        response = response.filter(Product.product_type == product_type)
    
    result = response.all()
    return [product_to_schema(p) for p in result]

# Запрос на получение одного товара по id
@app.get("/products/{id}", response_model=ProductBase)
def get_product(id:int, db:Session = Depends(get_db)):
    response = db.query(Product).filter(Product.id == id).first()
    if not response:
        return {"message": "Product not found"}
    
    return product_to_schema(response)

# Запрос на удаление одного продукта по id
@app.delete("/products/delete/{id}")
def delete_product(id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Данный продукт не найден!")
    db.delete(product)
    db.commit()
    return "Product has been deleted"

# Запрос на создание продукта
@app.post("/products/create")
def create_product(product: ProductBase, db: Session = Depends(get_db)):
    details = product.details

    if isinstance(details, DispenserBase):
        new_product = Dispenser(
            product_type= details.product_type,
            name=product.name, 
            price=product.price,
            image=product.image,
            heat=product.details.heat,
            cool=product.details.cool
            )
    elif isinstance(details, PurifierBase):
        new_product = Purifier(
            product_type= details.product_type,
            name=product.name, 
            price=product.price,
            image=product.image,
            filters=product.details.filters,
            water_modes=product.details.water_modes
            )
    elif isinstance(details, FountainBase):
        new_product = Fountain(
            product_type= details.product_type,
            name=product.name, 
            price=product.price,
            image=product.image,
            flow_rate=product.details.flow_rate,
            water_type=product.details.water_type
        )
    else:
        raise HTTPException(status_code=400, detail="Неизвестное поле для такого типа")
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product

# Запрос на обновления продукта 
@app.put("/products/update/{id}")
def update_product(id: int, data: ProductBase, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == id).first()
    
    if not product:
        return {"message": "Product not found"}

    product.name = data.name
    product.price = data.price
    product.image = data.image

    details = data.details


    if product.product_type == "ДИСПЕНСЕРЫ" and isinstance(details, DispenserBase):
        product.heat = details.heat
        product.cool = details.cool
    elif product.product_type == "ПУРИФАЙЕР" and isinstance(details, PurifierBase):
        product.filters = details.filters
        product.water_modes = details.water_modes
    elif product.product_type == "ПИТЬЕВОЙ ФОНТАН" and isinstance(details, FountainBase):
        product.flow_rate = details.flow_rate
        product.water_type = details.water_type
    
    else:
        raise HTTPException(status_code=400, detail="Не та категория")
    db.commit()
    db.refresh(product)
    return product




