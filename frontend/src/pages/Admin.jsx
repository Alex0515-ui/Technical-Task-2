import { useEffect, useRef, useState } from "react";
import axios from 'axios'
import '../assets/Admin.css'
function Admin() {
    const [products, setProducts] = useState([])
    const [selectedProductId, setSelectedProductId] = useState(null)
    const [form, setForm] = useState({})
    const NameInputRef = useRef()

    // Загрузка всех наших товаров в карточки
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/products").then(res => setProducts(res.data))
    }, [])

    // Эффект фокуса на поле при выборе товара
    useEffect(() => {
        if (selectedProductId) {
            NameInputRef.current.focus()
        }
    }, [selectedProductId])

    // Функция для добавления продукта
    const addProduct = async () => {
        const payload = {...form, price: form.price === "" ? 0 : form.price} // price отдельно выделил, так как были баги
        try {
            const response = await axios.post("http://127.0.0.1:8000/products/create", payload)
        
            const newProduct = {
            id: response.data.id,
            name: response.data.name,
            price: response.data.price,
            image: response.data.image,
            category: response.data.category,
            heat: response.data.heat || null,
            cool: response.data.cool || null,
            water_type: response.data.water_type || null,
            flow_rate: response.data.flow_rate || null,
            filters: response.data.filters || null,
            water_modes: response.data.water_modes || null,
            };
            setProducts([...products, newProduct])
            setForm({})
            console.log("Продукт успешно создан!");
        }
        catch(e) {
            console.error(e.response.data)
        }
        
    }

    // Функция где данные продукта переносятся в форму
    const loadProduct = async (id) => {
        try{ 
            const product = products.find(p => p.id == id)
            setSelectedProductId(id)
            setForm(product)
        }
        catch(e) {
            console.error(e)
        }
        
    }

    // Функция для обновления товара
    const redactProduct = async () => {
        try {
            const payload = {...form}
            delete payload.id
            const response = await axios.put(`http://127.0.0.1:8000/products/update/${selectedProductId}`, payload)

            setProducts(prev => prev.map(p => p.id == selectedProductId ? response.data : p))

            setForm({})
            setSelectedProductId(null)
            console.log("Товар успешно обновлен!")
        }
        catch(e) {
            console.error(e)
        }
    }
    // Функция для удаления товара
    const delete_product = async (id) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/products/delete/${id}`)
            setProducts(products.filter(product => product.id !== id))
            console.log("Продукт успешно удален!")
        }   
        catch(e) {
            console.error(e)
        }
    }

    const CATEGORY_FIELDS = {
        "ДИСПЕНСЕРЫ": ["heat", "cool"],
        "ПИТЬЕВОЙ ФОНТАН": ["water_type", "flow_rate"],
        "ПУРИФАЙЕР": ["filters", "water_modes"]
    }

    const ALL_FIELDS = [ "heat", "cool", "water_type", "flow_rate", "filters", "water_modes"]

    const handle_category_change = (category) => {
        const allowed_fields = CATEGORY_FIELDS[category] || []
        

        const clearedForm = {
            name: form.name,
            price: form.price,
            image: form.image,
            category
        }
        
        ALL_FIELDS.forEach(field => {
        // обнуляем все поля, кроме разрешенных для выбранной категории
        clearedForm[field] = allowed_fields.includes(field) ? (form[field] || "") : null
    })


        setForm(clearedForm)
    }
    return (
<div>
    <header className="header">
        <h1 className="logo">Админ-панель | Продажа воды</h1>
    </header>

<main className="container">

    <section className="form-section">
        <h2>Добавить / Редактировать товар</h2>
        <form className="product-form">
            <input value={form.name || ""} ref={NameInputRef} placeholder="Название товара" required onChange={e => setForm({...form, name:e.target.value})}/>
            <input type="number" value={form.price ?? ""} placeholder="Цена" required onChange={e => setForm({...form, price: e.target.value == "" ? "" : Number(e.target.value)})}/>
            <input type="text" value={form.image || ""} placeholder="URL изображения" required onChange={e => setForm({...form, image:e.target.value})}/>
            <select name="category" required value={form.category || ""} onChange={e => handle_category_change(e.target.value)}>
                <option value="">Выберите категорию</option>
                <option value="ПУРИФАЙЕР">ПУРИФАЙЕР</option>
                <option value="ПИТЬЕВОЙ ФОНТАН">ПИТЬЕВОЙ ФОНТАН</option>
                <option value="ДИСПЕНСЕРЫ">ДИСПЕНСЕРЫ</option>
            </select>
           {form.category == "ДИСПЕНСЕРЫ" && ( <>
           <input type="text" value={form.heat || ""} placeholder="Нагрев" required onChange={e => setForm({...form, heat: e.target.value})}/>
           <input type="text" value={form.cool || ""} placeholder="Охлаждение" required onChange={e => setForm({...form, cool: e.target.value})}/>
           </>  ) }
           {form.category == "ПИТЬЕВОЙ ФОНТАН" && ( <>
           <input type="text" value={form.water_type || ""} placeholder="Тип воды" required onChange={e => setForm({...form, water_type: e.target.value})}/>
           <input type="text" value={form.flow_rate || ""} placeholder="Производительность" required onChange={e => setForm({...form, flow_rate: e.target.value})}/>
           </>  ) }
           {form.category == "ПУРИФАЙЕР" && ( <>
           <input type="text" value={form.filters || ""} placeholder="Фильтры" required onChange={e => setForm({...form, filters: e.target.value})}/>
           <input type="text" value={form.water_modes || ""} placeholder="Режим воды" required onChange={e => setForm({...form, water_modes: e.target.value})}/>
           </>  ) }
            <button type="button" className="save-btn" onClick={selectedProductId ? redactProduct : addProduct}>Сохранить</button>
        </form>
    </section>

    <section className="products-section">
        <h2>Товары</h2>
        <div className="products">

            {/*  Карточка товара  */}
            {
               products.map(product => {
                return (
        <div className="card" key={product.id}>
            <div className="image-container">
                <img src={product.image} alt={product.name} />
            </div>
            <h3>{product.name}</h3>
            <div className="divider"></div>
            <div className="details">
                {product.heat && (<p><strong>Нагрев:</strong> {product.heat}</p>)}
                {product.cool && (<p><strong>Охлаждение:</strong>{product.cool}</p>)}
                {product.water_type && (<p><strong>Тип воды:</strong>{product.water_type}</p>)}
                {product.flow_rate && (<p><strong>Производительность:</strong>{product.flow_rate}</p>)}
                {product.filters && (<p><strong>Фильтры:</strong>{product.filters}</p>)}
                {product.water_modes && (<p><strong>Режимы:</strong>{product.water_modes}</p>)}
            </div>
            <div className="price">{product.price} ₸</div>
            <div className="actions">
                <button className="edit" onClick={() => loadProduct(product.id)}>Редактировать</button>
                <button className="delete" onClick={() => delete_product(product.id)}>Удалить</button>
            </div>
        </div>

                );
               }) 
            }
        
        </div>
    </section>

</main>

</div>
        
    );
}
export default Admin;