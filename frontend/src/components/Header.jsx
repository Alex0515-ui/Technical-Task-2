import React from "react";
import { Droplets } from "lucide-react";

function Header({scrollToProducts, scrollToAbout, scrollToContacts}) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 py-5 px-6 md:px-12 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        <div className="flex items-center gap-2 cursor-pointer">
          <Droplets className="text-blue-500 w-9 h-9" strokeWidth={2.5} />
          <span className="text-2xl font-bold text-gray-800 tracking-tight">
            Aqua
          </span>
        </div>

        <div className="flex items-center gap-10">
          <nav className="hidden md:flex items-center gap-8">
            <a href="#products" onClick={(e) => { e.preventDefault(); scrollToProducts();}} className="text-base font-medium text-gray-600 hover:text-blue-500 transition-colors">
              Вода и товары
            </a>
            <a href="#about-us" onClick={(e) => { e.preventDefault(); scrollToAbout();}} className="text-base font-medium text-gray-600 hover:text-blue-500 transition-colors">
              О нас
            </a>
            <a href="#contacts" onClick={(e) => {e.preventDefault(); scrollToContacts();}} className="text-base font-medium text-gray-600 hover:text-blue-500 transition-colors">
              Контакты
            </a>
          </nav>
        </div>

      </div>
    </header>
  );
}

export default Header;