import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const allProducts = [
  { id: 1, category: 'ДЕСПЕНСЕРЫ', title: "МОДЕЛЬ ДИСПЕНСЕРА BONA D22", image: "https://oasiswater.kz/wp-content/uploads/2023/03/000000170-2.jpg", specs: { size: "300х300х395 мм", heat: "5л/ч (>90-95° C)", cool: "0.7л/ч (<10-12° C)" }, price: "29 500 ₸" },
  { id: 2, category: 'ДЕСПЕНСЕРЫ', title: "МОДЕЛЬ ДИСПЕНСЕРА BONA 18 TA", image: "https://oasiswater.kz/wp-content/uploads/2023/03/000000434.jpg.webp", specs: { size: "340х330х530 мм", heat: "5л/ч (>90-95° C)", cool: "0.7л/ч (<10-12° C)" }, price: "32 000 ₸" },
  { id: 3, category: 'ПИТЬЕВОЙ ФОНТАН', title: "МОДЕЛЬ ДИСПЕНСЕРА ECOCOOL 55TK", image: "https://oasiswater.kz/wp-content/uploads/2023/03/000000004-2.jpg", specs: { size: "290x285x395 мм", heat: "5л/ч (>90-95° C)", cool: "комнатная температура" }, price: "21 000 ₸" },
  { id: 4, category: 'ДЕСПЕНСЕРЫ', title: "МОДЕЛЬ ДИСПЕНСЕРА BONA D22", image: "https://oasiswater.kz/wp-content/uploads/2023/03/000000170-2.jpg", specs: { size: "300х300х395 мм", heat: "5л/ч (>90-95° C)", cool: "0.7л/ч (<10-12° C)" }, price: "29 500 ₸" },
  { id: 5, category: 'ДЕСПЕНСЕРЫ', title: "МОДЕЛЬ ДИСПЕНСЕРА BONA 18 TA", image: "https://oasiswater.kz/wp-content/uploads/2023/03/000000434.jpg.webp", specs: { size: "340х330х530 мм", heat: "5л/ч (>90-95° C)", cool: "0.7л/ч (<10-12° C)" }, price: "32 000 ₸" },
  { id: 6, category: 'ПИТЬЕВОЙ ФОНТАН', title: "МОДЕЛЬ ДИСПЕНСЕРА ECOCOOL 55TK", image: "https://oasiswater.kz/wp-content/uploads/2023/03/000000004-2.jpg", specs: { size: "290x285x395 мм", heat: "5л/ч (>90-95° C)", cool: "комнатная температура" }, price: "21 000 ₸" },
];

const categories = ['ВСЕ', 'ДЕСПЕНСЕРЫ', 'ПИТЬЕВОЙ ФОНТАН', 'ПУРИФАЙЕР'];

function ProductSlider ({ productsRef, scrollToProducts }) {
  const [selectedCategory, setSelectedCategory] = useState('ВСЕ');

  const filteredProducts =
    selectedCategory === 'ВСЕ'
      ? allProducts
      : allProducts.filter(p => p.category === selectedCategory);

  return (
    <div ref={productsRef} className="w-full max-w-5xl mx-auto py-8 px-4 overflow-hidden">
      {/* Фильтры */}
      <div className="flex gap-2 mb-6 justify-center flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full font-bold transition text-[10px] uppercase tracking-tighter ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-500'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Ограниченный по ширине контейнер слайдера */}
      <div className="w-full max-w-[350px] sm:max-w-none mx-auto">
        <Swiper
          key={selectedCategory}
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="!pb-12"
        >
          {filteredProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100 flex flex-col h-full min-w-0">
                <div className="h-48 w-full flex items-center justify-center mb-4">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="max-w-full max-h-full object-contain" 
                  />
                </div>
                
                <h3 className="text-blue-600 font-bold text-[13px] leading-tight mb-3 min-h-[36px] uppercase">
                  {product.title}
                </h3>
                
                <div className="w-8 h-[1px] bg-gray-300 mb-4"></div>
                
                <div className="text-[11px] text-gray-600 space-y-1 mb-5 flex-grow">
                  <p><span className="font-bold text-gray-800">Габариты:</span> {product.specs.size}</p>
                  <p><span className="font-bold text-gray-800">Нагрев:</span> {product.specs.heat}</p>
                  <p><span className="font-bold text-gray-800">Охлаждение:</span> {product.specs.cool}</p>
                </div>
                
                <div className="mt-auto">
                  <div className="text-xl font-bold mb-4 text-gray-900">{product.price}</div>
                  <button className="w-full bg-blue-500 text-white py-2.5 rounded-lg font-bold text-xs hover:bg-blue-600 transition-colors uppercase tracking-wider">
                    Подробнее
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductSlider;