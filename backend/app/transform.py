from schemas import ProductBase, FountainBase, PurifierBase, DispenserBase
from models import Product, Dispenser, Fountain, Purifier

def product_to_schema(product: Product) -> ProductBase:
    if isinstance(product, Dispenser):
        details = DispenserBase(
            product_type=product.product_type,
            heat=product.heat,
            cool=product.cool
        )
    elif isinstance(product, Purifier):
        details = PurifierBase(
            product_type=product.product_type,
            filters=product.filters,
            water_modes=product.water_modes
        )
    elif isinstance(product, Fountain):
        details = FountainBase(
            product_type=product.product_type,
            water_type=product.water_type,
            flow_rate=product.flow_rate
        )
    return ProductBase(
        name=product.name,
        price=product.price,
        image=product.image,
        details=details
    )