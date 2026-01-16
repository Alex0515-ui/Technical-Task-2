from sqladmin import Admin, ModelView
from models import Product
from database import engine
from fastapi import FastAPI

app = FastAPI()
admin = Admin(app, engine)

class ProductAdmin(ModelView, model=Product):
    column_list = [Product.id, Product.name, Product.price]

admin.add_view(ProductAdmin)
