from fastapi import FastAPI, Depends
from sqlalchemy.orm import declarative_base, Session
from schemas import Get_Products, Update_Product, Create_Product
from database import engine, get_db
from models import Product, Category


app = FastAPI()

# Запрос на получение всех продуктов
@app.get("/products", response_model=list[Get_Products])
def get_all_products(category: Category | None = None, db: Session = Depends(get_db)):
    response = db.query(Product)
    
    # query параметр для фильтрации по категории
    if category:
        response = response.filter(Product.category == category.value)

    result = response.all()
    return result

# Запрос на удаление одного продукта по id
@app.delete("/products/delete/{id}")
def delete_product(id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == id).first()
    if not product:
        return {"message" : "Product not found"}
    db.delete(product)
    db.commit()
    return "Product has been deleted"

# Запрос на создание продукта
@app.post("/products/create")
def create_product(product: Create_Product, db: Session = Depends(get_db)):
    new_product = Product(name = product.name, price = product.price, image = product.image, category = product.category.value)
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
    
    if data.name is not None:
        product.name = data.name
    if data.image is not None:
        product.image = data.image
    if data.price is not None:
        product.price = data.price
    if data.category is not None:
        product.category = data.category.value
    
    db.commit()
    return product


