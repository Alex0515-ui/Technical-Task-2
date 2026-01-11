import { useEffect, useRef, useState } from "react";
import axios from 'axios'
import '../assets/Admin.css'
function Admin() {
    //  size = Column(String)
    // heat = Column(String)
    // cool = Column(String)
    const [products, setProducts] = useState([])
    const [selectedProductId, setSelectedProductId] = useState(null)
    const [form, setForm] = useState({})
    const NameInputRef = useRef()
    const [details, SetDetails] = useState({details: {}})

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
        setProducts([...products, response.data])
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
            setForm({...product, details:product.details || {}})
        }
        catch(e) {
            console.error(e)
        }
        
    }

    // Функция для обновления товара
    const redactProduct = async () => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/products/update/${selectedProductId}`, form)
            setProducts(products.map(p => p.id == selectedProductId ? response.data : p))
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
            <input type="text" value={form.details?.size || ""} placeholder="Габариты" required onChange={e => setForm({...form, details: {...form.details, size: e.target.value}})}/>
            <input type="text" value={form.details?.heat || ""} placeholder="Нагрев" required onChange={e => setForm({...form, details: {...form.details, heat: e.target.value}})}/>
            <input type="text" value={form.details?.cool || ""} placeholder="Охлаждение" required onChange={e => setForm({...form, details: {...form.details, cool: e.target.value}})}/>
            <select name="category" required value={form.category || ""} onChange={e => setForm({...form, category:e.target.value})}>
                <option value="">Выберите категорию</option>
                <option value="ПУРИФАЙЕР">ПУРИФАЙЕР</option>
                <option value="ПИТЬЕВОЙ ФОНТАН">ПИТЬЕВОЙ ФОНТАН</option>
                <option value="ДИСПЕНСЕРЫ">ДИСПЕНСЕРЫ</option>
            </select>
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
    {product.details?.size && (<p><strong>Габариты:</strong>{product.details.size}</p>)}
    {product.details?.heat && (<p><strong>Нагрев:</strong> {product.details.heat}</p>)}
    {product.details.cool && (<p><strong>Охлаждение:</strong>{product.details.cool}</p>)}
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