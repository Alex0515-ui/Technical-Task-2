from sqlalchemy.orm import Session
from database import SessionLocal
from models import Product

all_products_data = [
    { "id": 1, "category": 'ДИСПЕНСЕРЫ', "name": "МОДЕЛЬ ДИСПЕНСЕРА BONA D22", "image": "https://via.placeholder.com/200x250", "size": "300х300х395 мм", "heat": "5л/ч (>90-95° C)", "cool": "0.7л/ч (<10-12° C)", "price": "29 500" },
    { "id": 2, "category": 'ДИСПЕНСЕРЫ', "name": "МОДЕЛЬ ДИСПЕНСЕРА BONA 18 TA", "image": "https://via.placeholder.com/200x250", "size": "340х330х530 мм", "heat": "5л/ч (>90-95° C)", "cool": "0.7л/ч (<10-12° C)", "price": "32 000" },
    { "id": 3, "category": 'ПИТЬЕВОЙ ФОНТАН', "name": "МОДЕЛЬ ДИСПЕНСЕРА ECOCOOL 55TK", "image": "https://via.placeholder.com/200x250", "size": "290x285x395 мм", "heat": "5л/ч (>90-95° C)", "cool": "комнатная температура", "price": "21 000" },
    { "id": 6, "category": 'ПУРИФАЙЕР', "name": "МОДЕЛЬ ДИСПЕНСЕРА ECOCOOL 55TK", "image": "https://via.placeholder.com/200x250", "size": "290x285x395 мм", "heat": "5л/ч (>90-95° C)", "cool": "комнатная температура", "price": "21 000" }
]

def seed_db():
    db: Session = SessionLocal()
    try:
        # Проверяем, пуста ли база, чтобы не дублировать
        if db.query(Product).count() == 0:
            for item in all_products_data:
                new_product = Product(
                    name=item["name"],
                    price=item["price"],
                    image=item["image"],
                    category=item["category"],
                    size=item["size"],
                    heat=item["heat"],
                    cool=item["cool"]
                )
                db.add(new_product)
            db.commit()
            print("База успешно наполнена!")
        else:
            print("База уже содержит данные.")
    except Exception as e:
        print(f"Ошибка: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_db()