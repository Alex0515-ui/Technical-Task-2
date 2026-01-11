function Product_card() {
    return (
        <div class="card">
            <img src="https://via.placeholder.com/300x200" alt="Пурифайер"/>
            <h3>Пурифайер Aqua Pro 500</h3>
            <p class="price">25 000 ₸</p>
            <div class="actions">
                <button class="edit">Редактировать</button>
                <button class="delete">Удалить</button>
            </div>
        </div>
    );
}

export default Product_card;