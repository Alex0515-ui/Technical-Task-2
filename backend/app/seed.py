from sqlalchemy.orm import Session
from database import session  # твой sessionmaker
from models import Product

# Данные для наполнения базы
all_products_data = [
    {
        "category": "ДИСПЕНСЕРЫ",
        "name": "МОДЕЛЬ ДИСПЕНСЕРА BONA D22",
        "image": "https://oasiswater.kz/wp-content/uploads/2023/03/000000004-2.jpg",
        "price": 29500,
        "heat": "5л/ч (>90-95° C)",
        "cool": "0.7л/ч (<10-12° C)"
    },
    {
        "category": "ДИСПЕНСЕРЫ",
        "name": "МОДЕЛЬ ДИСПЕНСЕРА BONA 18 TA",
        "image": "https://oasiswater.kz/wp-content/uploads/2023/03/000000004-2.jpg",
        "price": 32000,
        "heat": "5л/ч (>90-95° C)",
        "cool": "0.7л/ч (<10-12° C)"
    },
    {
        "category": "ПИТЬЕВОЙ ФОНТАН",
        "name": "МОДЕЛЬ ECOCOOL 55TK",
        "image": "https://oasiswater.kz/wp-content/uploads/2023/03/55TK-1.jpg",
        "price": 21000,
        "water_type": "комнатная температура",
        "flow_rate": "5л/ч (>90-95° C)"
    },
    {
        "category": "ПУРИФАЙЕР",
        "name": "ПУРИФАЙЕР AQUA PURE 3000",
        "image": "https://example.com/purifier.jpg",
        "price": 45000,
        "filters": "3-stage",
        "water_modes": "холодная, горячая"
    }
]

def seed_db():
    # создаем сессию
    db: Session = session()
    try:
        # Проверяем, пуста ли база
        if db.query(Product).count() == 0:
            for item in all_products_data:
                new_product = Product(
                    name=item["name"],
                    price=item["price"],
                    image=item["image"],
                    category=item["category"],
                    heat=item.get("heat"),
                    cool=item.get("cool"),
                    water_type=item.get("water_type"),
                    flow_rate=item.get("flow_rate"),
                    filters=item.get("filters"),
                    water_modes=item.get("water_modes")
                )
                db.add(new_product)
            db.commit()
            print("База теперь наполнена!")
        else:
            print("База уже содержит данные!")
    except Exception as e:
        print(f"Ошибка при наполнении базы: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    seed_db()
