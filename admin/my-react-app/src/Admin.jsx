import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./assets/Admin.css"

function Admin() {
  console.log("ADMIN MOUNTED");

  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [form, setForm] = useState({});
  const [error, setError] = useState(false)
  const NameInputRef = useRef();

// Загрузка всех товаров при запуске
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/products").then(res => {
      const normalized = res.data.map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        image: p.image,
        category: p.details.product_type,
        ...p.details,
      }));
      setProducts(normalized);
    });
  }, []);
  // Фокус на поле при нажатии на редактирование
  useEffect(() => {
    if (selectedProductId) {
      NameInputRef.current.focus();
    }
  }, [selectedProductId]);

  // Функция для установки отдельных полей под каждую категорию
  const buildDetails = () => {
    const { category } = form;

    if (category === "ДИСПЕНСЕРЫ") {
      return {
        product_type: category,
        heat: form.heat,
        cool: form.cool,
      };
    }

    if (category === "ПУРИФАЙЕР") {
      return {
        product_type: category,
        filters: form.filters,
        water_modes: form.water_modes,
      };
    }

    if (category === "ПИТЬЕВОЙ ФОНТАН") {
      return {
        product_type: category,
        water_type: form.water_type,
        flow_rate: form.flow_rate,
      };
    }

    return null;
  };

  //Создание товара
  const addProduct = async () => {
    try {
      const payload = {
        name: form.name,
        price: Number(form.price),
        image: form.image,
        details: buildDetails(),
      };

      const res = await axios.post(
        "http://127.0.0.1:8000/products/create",
        payload
      );

      const newProduct = {
        id: res.data.id,
        ...form,
      };

      setProducts(prev => [...prev, newProduct]);
      setForm({});
      setSelectedProductId(null);
    } catch (e) {
      console.error(e.response?.data || e);
    }
  };

  // Перенос данных товара в форму
  const loadProduct = (id) => {
    const product = products.find(p => p.id === id);
    setSelectedProductId(id);
    setForm(product);
  };

  // Изменение нашего товара
  const redactProduct = async () => {
    try {
      const payload = {
        name: form.name,
        price: Number(form.price),
        image: form.image,
        details: buildDetails(),
      };

      await axios.put(
        `http://127.0.0.1:8000/products/update/${selectedProductId}`,
        payload
      );

      setProducts(prev =>
        prev.map(p =>
          p.id === selectedProductId ? { ...p, ...form } : p
        )
      );

      setForm({});
      setSelectedProductId(null);
    } catch (e) {
      console.error(e.response?.data || e);
    }
  };

  // Удаление продукта
  const delete_product = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/products/${id}`);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (e) {
      console.error(e.response?.data || e);
    }
  };

  // Допустимые поля для каждой категории
  const CATEGORY_FIELDS = {
    "ДИСПЕНСЕРЫ": ["heat", "cool"],
    "ПИТЬЕВОЙ ФОНТАН": ["water_type", "flow_rate"],
    "ПУРИФАЙЕР": ["filters", "water_modes"],
  };

  // Все поля для категорий
  const ALL_FIELDS = [
    "heat",
    "cool",
    "water_type",
    "flow_rate",
    "filters",
    "water_modes",
  ];

  // Функция которая срабатывает когда меняешь категорию в полях формы
  const handle_category_change = (category) => {
    const allowed = CATEGORY_FIELDS[category] || [];

    const clearedForm = {
      name: form.name,
      price: form.price,
      image: form.image,
      category,
    };

  ALL_FIELDS.forEach(field => {
      clearedForm[field] = allowed.includes(field) ? form[field] || "" : "";
    });

    setForm(clearedForm);
  };

  const handle_save = () => {
    if (!form.category) {
      setError(true)
      return
    }

    setError(false)

    if (selectedProductId) {
      redactProduct();
    }
    else {
      addProduct();
    }
  };

  return (
    <div>
      <header className="header">
        <h1 className="logo">Админ-панель | Продажа воды</h1>
      </header>

      <main className="container">
        <section className="form-section">
          <h2>Добавить / Редактировать товар</h2>
          <form className="product-form">
            <input
              value={form.name || ""}
              ref={NameInputRef}
              placeholder="Название товара"
              onChange={e =>  setForm({...form, name: e.target.value})}
            />
            <input
              type="number"
              value={form.price ?? ""}
              placeholder="Цена"
              onChange={e =>
              setForm({...form, price: e.target.value})
              }
            />
            <input
              type="text"
              value={form.image || ""}
              placeholder="URL изображения"
              onChange={e =>
                  setForm({...form, image: e.target.value})
              }
            />

            <select
              value={form.category || ""}
              onChange={e => {
                handle_category_change(e.target.value)
                setError(false)
              }}
            >
              <option value="placeholder">Выберите категорию</option>
              <option value="ПУРИФАЙЕР">ПУРИФАЙЕР</option>
              <option value="ПИТЬЕВОЙ ФОНТАН">ПИТЬЕВОЙ ФОНТАН</option>
              <option value="ДИСПЕНСЕРЫ">ДИСПЕНСЕРЫ</option>
            </select>

            {error && (<p className="error-save">Сначала выберите категорию!</p>)}

            {form.category === "ДИСПЕНСЕРЫ" && (
              <>
                <input
                  value={form.heat || ""}
                  placeholder="Нагрев"
                  onChange={e => setForm({...form, heat: e.target.value})}
                />
                <input
                  value={form.cool || ""}
                  placeholder="Охлаждение"
                  onChange={e => setForm({...form, cool: e.target.value})}
                />
              </>
            )}

            {form.category === "ПИТЬЕВОЙ ФОНТАН" && (
              <>
                <input
                  value={form.water_type || ""}
                  placeholder="Тип воды"
                  onChange={e =>
                    setForm({...form, water_type: e.target.value})
                  }
                />
                <input
                  value={form.flow_rate || ""}
                  placeholder="Производительность"
                  onChange={e =>
                    setForm({...form, flow_rate: e.target.value})
                  }
                />
              </>
            )}

            {form.category === "ПУРИФАЙЕР" && (
              <>
                <input
                  value={form.filters || ""}
                  placeholder="Фильтры"
                  onChange={e =>
                    setForm({...form, filters: e.target.value})
                  }
                />
                <input
                  value={form.water_modes || ""}
                  placeholder="Режим воды"
                  onChange={e =>
                    setForm({...form, water_modes: e.target.value})
                  }
                />
              </>
            )}

            <button
              type="button"
              className="save-btn"
              onClick={handle_save}
            >
              Сохранить
            </button>
          </form>
        </section>

        <section className="products-section">
          <h2>Товары</h2>
          <div className="products">
            {products.map(product => (
              <div className="card" key={product.id}>
                <div className="image-container">
                  <img src={product.image} alt={product.name} />
                </div>
                <h3>{product.name}</h3>
                <div className="divider"></div>
                <div className="details">
                  {product.heat && <p><strong>Нагрев:</strong> {product.heat}</p>}
                  {product.cool && <p><strong>Охлаждение:</strong> {product.cool}</p>}
                  {product.water_type && <p><strong>Тип воды:</strong> {product.water_type}</p>}
                  {product.flow_rate && <p><strong>Производительность:</strong> {product.flow_rate}</p>}
                  {product.filters && <p><strong>Фильтры:</strong> {product.filters}</p>}
                  {product.water_modes && <p><strong>Режимы:</strong> {product.water_modes}</p>}
                </div>
                <div className="price">{product.price} ₸</div>
                <div className="actions">
                  <button className="edit" onClick={() => loadProduct(product.id)}>
                    Редактировать
                  </button>
                  <button className="delete" onClick={() => delete_product(product.id)}>
                    Удалить
                  </button>
                </div>
              </div>
            ))}
             </div>
         </section>
    </main>
  </div>
  );
  
}

export default Admin;