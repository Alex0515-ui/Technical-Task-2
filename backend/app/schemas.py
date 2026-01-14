from pydantic import BaseModel
from typing import  Literal, Union
from typing_extensions import Annotated

# Здесь хранятся все схемы моделей, которые нужны для api запросов, чтобы указать какие поля нужны

# Поля для обновления продукта



class DispenserBase(BaseModel):
    product_type: Literal["ДИСПЕНСЕРЫ"]
    heat: str
    cool: str

class PurifierBase(BaseModel):
    product_type: Literal["ПУРИФАЙЕР"]
    water_modes: str
    filters: str

class FountainBase(BaseModel):
    product_type: Literal["ПИТЬЕВОЙ ФОНТАН"]
    water_type: str
    flow_rate: str

Details = Annotated[Union[DispenserBase, PurifierBase, FountainBase], {"discriminator": "product_type"}]

class ProductBase(BaseModel):
    name:str    
    price: int
    image: str
    details: Details

