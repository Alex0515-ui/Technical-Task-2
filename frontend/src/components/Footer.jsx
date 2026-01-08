import React from 'react';
import { Phone, Clock, Mail } from 'lucide-react';

const Footer = ({ contactsRef }) => {
  return (
    <footer 
      ref={contactsRef} 
      className="w-full bg-white border-t border-gray-100 py-12 px-4 mt-auto scroll-mt-20"
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Сетка контактов */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 w-full md:w-auto">
          
          {/* Телефон */}
          <div className="flex items-start gap-3">
            <div className="mt-1">
              <Phone className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Телефон:</p>
              <p className="font-bold text-gray-800 whitespace-nowrap">+7 (xxx) xxx xx xx</p>
            </div>
          </div>

          {/* Время работы */}
          <div className="flex items-start gap-3">
            <div className="mt-1">
              <Clock className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-gray-400 text-sm italic">Воскресенье выходной</p>
              <p className="font-bold text-gray-800 whitespace-nowrap">Пн-Сб с 8:00 до 18:00</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-3">
            <div className="mt-1">
              <Mail className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Email:</p>
              <p className="font-bold text-gray-800 lowercase">info@aqua.kz</p>
            </div>
          </div>

        </div>

        {/* Кнопка действия */}
        <div className="w-full md:w-auto text-center">
          <button className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold rounded-full shadow-lg shadow-blue-200 hover:shadow-xl transition-all uppercase tracking-wider text-sm">
            Оставить заказ
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;