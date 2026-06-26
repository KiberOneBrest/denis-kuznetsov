'use client';

import { useState } from 'react';

export default function UserForm() {
  const [formData, setFormData] = useState({
    name: '',
    height: '',
    favoriteColor: '#000000',
    birthDate: '',
    pRankCount: '',
  });
  
  const [status, setStatus] = useState({
    type: 'idle', // idle | loading | success | error
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Отправка...' });

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          pRankCount: parseInt(formData.pRankCount) || 0,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: '✅ Форма успешно отправлена!' });
        setFormData({
          name: '',
          height: '',
          favoriteColor: '#000000',
          birthDate: '',
          pRankCount: '',
        });
      } else {
        throw new Error(data.error || 'Ошибка отправки');
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || '❌ Ошибка при отправке',
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Анкета пользователя</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Имя */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Имя *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="Введите ваше имя"
          />
        </div>

        {/* Рост */}
        <div>
          <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
            Рост (см) *
          </label>
          <input
            type="number"
            id="height"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
            min="50"
            max="300"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="Например: 175"
          />
        </div>

        {/* Любимый цвет */}
        <div>
          <label htmlFor="favoriteColor" className="block text-sm font-medium text-gray-700 mb-1">
            Любимый цвет *
          </label>
          <div className="flex items-center gap-4">
            <input
              type="color"
              id="favoriteColor"
              name="favoriteColor"
              value={formData.favoriteColor}
              onChange={handleChange}
              required
              className="w-16 h-16 border border-gray-300 rounded-md cursor-pointer p-1"
            />
            <span className="text-sm text-gray-600">{formData.favoriteColor}</span>
          </div>
        </div>

        {/* Дата рождения */}
        <div>
          <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">
            Дата рождения *
          </label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        {/* Кол-во P-рангов */}
        <div>
          <label htmlFor="pRankCount" className="block text-sm font-medium text-gray-700 mb-1">
            Кол-во P-рангов в ULTRAKILL *
          </label>
          <input
            type="number"
            id="pRankCount"
            name="pRankCount"
            value={formData.pRankCount}
            onChange={handleChange}
            required
            min="0"
            step="1"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="0"
          />
          <p className="mt-1 text-xs text-gray-500">Количество P-рангов, полученных в игре ULTRAKILL</p>
        </div>

        {/* Статус */}
        {status.message && (
          <div className={`p-3 rounded-md ${
            status.type === 'success' ? 'bg-green-100 text-green-700' :
            status.type === 'error' ? 'bg-red-100 text-red-700' :
            status.type === 'loading' ? 'bg-blue-100 text-blue-700' : ''
          }`}>
            {status.message}
          </div>
        )}

        {/* Кнопка отправки */}
        <button
          type="submit"
          disabled={status.type === 'loading'}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status.type === 'loading' ? 'Отправка...' : 'Отправить'}
        </button>
      </form>
    </div>
  );
}