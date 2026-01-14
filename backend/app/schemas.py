from pydantic import BaseModel, ConfigDict, Field
from typing import Union, Literal

class DispenserSchema(BaseModel):
    product_type: Literal["ДИСПЕНСЕРЫ"]
    heat: str
    cool: str

class PurifierSchema(BaseModel):
    product_type: Literal["ПУРИФАЙЕР"]
    filters: str
    water_modes: str

class FountainSchema(BaseModel):
    product_type: Literal["ПИТЬЕВОЙ ФОНТАН"]
    water_type: str
    flow_rate: str

class ProductResponse(BaseModel):
    id: int
    name: str
    price: int
    image: str
    # Автоматически выберет нужную схему по полю product_type
    details: Union[DispenserSchema, PurifierSchema, FountainSchema] = Field(..., discriminator='product_type')

    model_config = ConfigDict(from_attributes=True)


class ProductCreate(BaseModel):
    name: str
    price: int
    image: str
    details: Union[DispenserSchema, PurifierSchema, FountainSchema]

class ProductUpdate(BaseModel):
    name: str
    price: int
    image: str
    details: Union[DispenserSchema, PurifierSchema, FountainSchema]
