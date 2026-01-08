import React from 'react';

function AboutSection ({ aboutRef }) {
  const features = [
    {
      title: "Качество продукции",
      description: "Мы предлагаем только сертифицированное оборудование от ведущих мировых производителей.",
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-2.06 3.42 3.42 0 014.438 0c.645.717 1.48 1.258 2.41 1.55a3.42 3.42 0 012.396 4.387c-.24.933-.21 1.924.088 2.839a3.42 3.42 0 01-2.396 4.387c-.93.292-1.765.833-2.41 1.55a3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-2.06 3.42 3.42 0 01-2.396-4.387c.24-.933.21-1.924-.088-2.839a3.42 3.42 0 012.396-4.387c.93-.292 1.765-.833 2.41-1.55z" />
        </svg>
      )
    },
    {
      title: "Сервисная поддержка",
      description: "Собственный сервисный центр для оперативного обслуживания и ремонта ваших диспенсеров.",
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Доставка и установка",
      description: "Бесплатная доставка по городу и профессиональное подключение оборудования в день заказа.",
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-16 bg-gray-50" ref={aboutRef}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 uppercase tracking-wide mb-6">
            О компании <span className="text-blue-600">Aqua</span>
          </h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto mb-8"></div>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed">
            Мы работаем на рынке Казахстана более 10 лет, обеспечивая дома и офисы чистой питьевой водой. 
            Наша миссия — сделать доступ к качественной воде простым и удобным для каждого клиента, 
            предлагая современные решения в области фильтрации и розлива.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1 text-center"
            >
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 uppercase tracking-tight">
                {feature.title}
              </h3>
              <p className="text-gray-500 leading-normal">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default AboutSection;