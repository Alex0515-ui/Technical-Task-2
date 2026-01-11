from sqlalchemy.orm import Session
from database import SessionLocal
from models import Product

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
                    details=item["details"]
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