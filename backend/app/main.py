from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas import Get_Products, Update_Product, Create_Product
from fastapi.middleware.cors import CORSMiddleware
from database import get_db
from models import Product, Category
from category_validate import validation_by_category
from seed import seed_db

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
@app.get("/products", response_model=list[Get_Products])
def get_all_products(category: Category | None = None, db: Session = Depends(get_db)):
    response = db.query(Product)
    # query параметр для фильтрации по категории
    if category:
        response = response.filter(Product.category == category.value)

    result = response.all()
    return result

# Запрос на получение одного товара по id
@app.get("/products/{id}")
def get_product(id:int, db:Session = Depends(get_db)):
    response = db.query(Product).filter(Product.id == id).first()
    if not response:
        return {"message": "Product not found"}
    
    return response

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
def create_product(product: Create_Product, db: Session = Depends(get_db)):
    new_product = Product(name = product.name,  
                          price = product.price,
                          image = product.image,
                          category = product.category.value,
                          heat = product.heat,
                          cool = product.cool,
                          water_type = product.water_type,
                          flow_rate = product.flow_rate,
                          filters = product.filters,
                          water_modes = product.water_modes
                          )
    validation_by_category(product)
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product

# Запрос на обновления продукта 
@app.put("/products/update/{id}")
def update_product(id: int, data: Update_Product, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == id).first()
    
    if not product:
        return {"message": "Product not found"}
    
    validation_by_category(data)

    product.heat = None
    product.cool = None
    product.water_type = None
    product.flow_rate = None
    product.filters = None
    product.water_modes = None

    for field, value in data.model_dump().items():
        if field == "category" and isinstance(value, Category):
            setattr(product, field, value.value)
        else:
            setattr(product, field, value)
    
    db.commit()
    db.refresh(product)
    return product




