import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const categories = ['ВСЕ', 'ПУРИФАЙЕР', 'ПИТЬЕВОЙ ФОНТАН', 'ДИСПЕНСЕРЫ'];

function ProductSlider ({ productsRef, scrollToProducts }) {
  const [selectedCategory, setSelectedCategory] = useState('ВСЕ');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        let url = 'http://127.0.0.1:8000/products';
        if(selectedCategory && selectedCategory !== 'ВСЕ') {
          url.searchParams.append('category', selectedCategory);
        }

        const response = await fetch(url);

        if(response.ok) {
          const data = await response.json();
          console.log("data:", data)
          setProducts(data);
        }
      } catch (error) {
        console.error('Ошибка при получении продуктов:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, [selectedCategory]);

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
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100 flex flex-col h-full min-w-0">
                <div className="h-48 w-full flex items-center justify-center mb-4">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="max-w-full max-h-full object-contain" 
                  />
                </div>
                
                <h3 className="text-blue-600 font-bold text-[13px] leading-tight mb-3 min-h-[36px] uppercase">
                  {product.name}
                </h3>
                
                <div className="w-8 h-[1px] bg-gray-300 mb-4"></div>
                
                <div className="text-[11px] text-gray-600 space-y-1 mb-5 flex-grow">
                    <p><span className="font-bold text-gray-800">Габариты:</span> {product?.size || 'Не указано'}</p>
                    <p><span className="font-bold text-gray-800">Нагрев:</span> {product?.heat || 'Не указано'}</p>
                    <p><span className="font-bold text-gray-800">Охлаждение:</span> {product?.cool || 'Не указано'}</p>
                  </div>

                <div className="mt-auto">
                  <div className="text-xl font-bold mb-4 text-gray-900">{product.price} ₸</div>
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