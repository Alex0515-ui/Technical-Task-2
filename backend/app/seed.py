from sqlalchemy.orm import Session
from database import session
from models import Product, Dispenser, Purifier, Fountain

MODEL_MAP = {
    "ДИСПЕНСЕРЫ": Dispenser,
    "ПУРИФАЙЕР": Purifier,
    "ПИТЬЕВОЙ ФОНТАН": Fountain
}

all_products_data = [
    {
        "category": "ДИСПЕНСЕРЫ",
        "name": "BONA D22",
        "image": "https://via.placeholder.com/200x250",
        "price": 29500,
        "heat": "5 л/ч (90–95°C)",
        "cool": "0.7 л/ч (10–12°C)"
    },
    {
        "category": "ДИСПЕНСЕРЫ",
        "name": "AQUA LINE WL-7",
        "image": "https://via.placeholder.com/200x250",
        "price": 34900,
        "heat": "6 л/ч (90–95°C)",
        "cool": "1 л/ч (8–10°C)"
    },
    {
        "category": "ПУРИФАЙЕР",
        "name": "ECO FILTER PRO",
        "image": "https://via.placeholder.com/200x250",
        "price": 55900,
        "filters": "Угольный, мембранный, постфильтр",
        "water_modes": "Холодная / горячая / комнатная"
    },
    {
        "category": "ПУРИФАЙЕР",
        "name": "PURE FLOW X2",
        "image": "https://via.placeholder.com/200x250",
        "price": 62900,
        "filters": "RO мембрана, минерализатор",
        "water_modes": "Холодная / горячая"
    },
    {
        "category": "ПИТЬЕВОЙ ФОНТАН",
        "name": "CITY DRINK 300",
        "image": "https://via.placeholder.com/200x250",
        "price": 78900,
        "water_type": "Питьевая",
        "flow_rate": "2 л/мин"
    },
    {
        "category": "ПИТЬЕВОЙ ФОНТАН",
        "name": "URBAN FLOW S",
        "image": "https://via.placeholder.com/200x250",
        "price": 84500,
        "water_type": "Питьевая / охлажденная",
        "flow_rate": "2.5 л/мин"
    },
    {
        "category": "ДИСПЕНСЕРЫ",
        "name": "AQUA SMART MINI",
        "image": "https://via.placeholder.com/200x250",
        "price": 26900,
        "heat": "4 л/ч (85–90°C)",
        "cool": "0.5 л/ч (12–15°C)"
    }
]


def seed_db():
    db: Session = session()
    try:
        if db.query(Product).count() == 0:
            for item in all_products_data:
                category = item.pop("category")
                model_class = MODEL_MAP.get(category)
                
                if model_class:
                    new_product = model_class(
                        **item,
                        product_type=category
                    )

                    db.add(new_product)
            
            db.commit()
            print("База наполнена правильно!")
    except Exception as e:
        print(f"Ошибка: {e}")
        db.rollback()
    finally:
        db.close()