import React, { useState } from 'react';

const OrderModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Данные клиента:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>
        <h3 className="text-blue-600 font-bold text-lg mb-4 text-center">Оставьте свои данные</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input 
            type="text" 
            name="name" 
            placeholder="Имя" 
            value={formData.name} 
            onChange={handleChange} 
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input 
            type="tel" 
            name="phone" 
            placeholder="Телефон" 
            value={formData.phone} 
            onChange={handleChange} 
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={formData.email} 
            onChange={handleChange} 
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button 
            type="submit" 
            className="mt-3 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition"
          >
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;
