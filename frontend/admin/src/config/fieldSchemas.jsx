// src/config/fieldSchemas.js

export const fieldSchemas = {
  records: [
    { name: 'title', label: 'Название' },
    { name: 'year', label: 'Год' },
    { name: 'description', label: 'Описание' },
    { name: 'price', label: 'Цена' },
    { name: 'image', label: 'URL изображения' },
    { name: 'stock', label: 'Остаток на складе' }
  ],
  compositions: [
    { name: 'title', label: 'Название' },
    { name: 'composer', label: 'Композитор' },
    { name: 'description', label: 'Описание' }
  ],
  ensembles: [
    { name: 'name', label: 'Название ансамбля' }
  ],
  musicians: [
    { name: 'name', label: 'Имя музыканта' },
    { name: 'instrument', label: 'Инструмент' },
    { name: 'ensembleId', label: 'ID ансамбля' } // можно сделать выпадающим позже
  ],
  companies: [
    { name: 'name', label: 'Название компании' },
    { name: 'country', label: 'Страна' },
    { name: 'foundedYear', label: 'Год основания' }
  ],
  top: [
    { name: 'category', label: 'Категория' },
    { name: 'items', label: 'Элементы (через запятую)' }
  ]
};
