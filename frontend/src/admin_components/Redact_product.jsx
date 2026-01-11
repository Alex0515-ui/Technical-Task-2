import { useState, useEffect } from "react";

const [products, setProducts] = useState([])
const [product, setProduct] = useState({})
const [newCard, setNewCard] = useState[{}]


function Redact_product() {

    return (
        <section className="form-section">
        <h2>Добавить / Редактировать товар</h2>
        <form className="product-form">
            <input type="text" name="name" placeholder="Название товара" required/>
            <input type="number" name="price" placeholder="Цена" required/>
            <input type="text" name="image" placeholder="URL изображения" required/>
            <select name="category" required>
                <option value="">Выберите категорию</option>
                <option value="Purifier">Пурифайер</option>
                <option value="Fountain">Питьевой фонтан</option>
                <option value="Dispancer">Диспенсер</option>
            </select>
            <button type="submit" className="save-btn">Сохранить</button>
        </form>
    </section>
    );
}

export default Redact_product;