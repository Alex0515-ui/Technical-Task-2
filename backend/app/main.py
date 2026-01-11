from fastapi import FastAPI, Depends
from sqlalchemy.orm import declarative_base, Session
from schemas import Get_Products, Update_Product, Create_Product
from fastapi.middleware.cors import CORSMiddleware
from database import engine, get_db, session
from models import Product, Category


app = FastAPI()

origins = [
    "http://localhost:5173",    
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def seed_db():
    db = session()
    try:
        if db.query(Product).count() == 0:
            all_products_data = [
    {
        "category": "ДИСПЕНСЕРЫ",
        "name": "МОДЕЛЬ ДИСПЕНСЕРА BONA D22",
        "image": "https://oasiswater.kz/wp-content/uploads/2023/03/000000004-2.jpg",
        "price": 29500,
        "details": {
            "size": "300х300х395 мм",
            "heat": "5л/ч (>90-95° C)",
            "cool": "0.7л/ч (<10-12° C)"
        }
    },
    {
        "category": "ДИСПЕНСЕРЫ",
        "name": "МОДЕЛЬ ДИСПЕНСЕРА BONA 18 TA",
        "image": "https://oasiswater.kz/wp-content/uploads/2023/03/000000004-2.jpg",
        "price": 32000,
        "details": {
            "size": "340х330х530 мм",
            "heat": "5л/ч (>90-95° C)",
            "cool": "0.7л/ч (<10-12° C)"
        }
    },
    {
        "category": "ПИТЬЕВОЙ ФОНТАН",
        "name": "МОДЕЛЬ ECOCOOL 55TK",
        "image": "https://oasiswater.kz/wp-content/uploads/2023/03/55TK-1.jpg",
        "price": 21000,
        "details": {
            "size": "290х285х395 мм",
            "heat": "5л/ч (>90-95° C)",
            "cool": "комнатная температура"
        }
    }
]

            for item in all_products_data:
                db.add(Product(**item))
            db.commit()
            print("База наполнена!")
    finally:
        db.close()

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
        return {"message" : "Product not found"}
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
                          details = product.details)
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
    if data.details is not None:
        product.details = data.details
    
    db.commit()
    return product




