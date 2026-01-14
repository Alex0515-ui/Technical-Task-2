from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session, with_polymorphic
from typing import Optional, Literal

import schemas
from database import get_db
from models import Dispenser, Purifier, Fountain, ProductCategory, Product
from seed import seed_db

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

@app.on_event("startup")
def startup():
    seed_db()


TYPE_MAP = {
    ProductCategory.DISPENSER.value: Dispenser,
    ProductCategory.PURIFIER.value: Purifier,
    ProductCategory.FOUNTAIN.value: Fountain,
}

@app.get("/products", response_model=list[schemas.ProductResponse])
def get_all_products(
    product_type: Optional[
        Literal["ДИСПЕНСЕРЫ", "ПУРИФАЙЕР", "ПИТЬЕВОЙ ФОНТАН"]
    ] = None,
    db: Session = Depends(get_db),
):
    poly = with_polymorphic(Product, [Dispenser, Purifier, Fountain])
    query = db.query(poly)


    if product_type:
        try:
            target_enum = ProductCategory(product_type)
            query = query.filter(Product.product_type == ProductCategory(product_type))
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid category")
        
    products = query.all()

    return [
        {
            "id": p.id,
            "name": p.name,
            "price": p.price,
            "image": p.image,
            "details": p,
        }
        for p in products
    ]

@app.post("/products/create")
def create_product(
    data: schemas.ProductCreate,
    db: Session = Depends(get_db),
):
    if not data.details:
        raise HTTPException(400, "details is required")

    model_class = TYPE_MAP.get(data.details.product_type)
    if not model_class:
        raise HTTPException(400, "Invalid product type")

    main_info = {
        "name": data.name,
        "price": data.price,
        "image": data.image,
    }

    details_info = data.details.model_dump(exclude={"product_type"})

    product = model_class(**main_info, **details_info)

    db.add(product)
    db.commit()
    db.refresh(product)

    return {"id": product.id}

@app.put("/products/update/{id}")
def update_product(
    id: int,
    data: schemas.ProductUpdate,
    db: Session = Depends(get_db),
):
    product = db.query(Product).filter(Product.id == id).first()
    if not product:
        raise HTTPException(404, "Not found")

    product.name = data.name
    product.price = data.price
    product.image = data.image

    if data.details:
        details_data = data.details.model_dump(exclude={"product_type"})
        for key, value in details_data.items():
            setattr(product, key, value)

    db.commit()

    return {"message": "Updated"}



@app.delete("/products/{id}")
def delete_product(id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == id).first()
    if not product:
        raise HTTPException(404, "Product not found")
    
    db.delete(product)
    db.commit()

    return {"message": f"Product {id} deleted successfully"}