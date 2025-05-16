# 🎧 MusicStore Microfrontends

Модульный фронтенд-проект на React + Vite + Module Federation  
По ГОСТ 19.101-77: строгая архитектура, независимость компонентов, инкапсуляция логики.

---

## 🧱 Структура микрофронтендов

- `shell` — контейнер с маршрутизацией и навигацией
- `auth` — вход/регистрация + JWT
- `records` — каталог пластинок
- `ensembles` — ансамбли и их состав
- `compositions` — произведения
- `top` — лидеры продаж
- `admin` — админ-панель + Grafana

---

## 🚀 Запуск проекта (локально)

1. Клонировать репозиторий:

```bash
git clone <repo_url>
cd frontend

2. Установить зависимости во всех модулях:

bash
Копировать
Редактировать
cd shell && npm install
cd ../auth && npm install
cd ../records && npm install
cd ../ensembles && npm install
cd ../compositions && npm install
cd ../top && npm install
cd ../admin && npm install

3. Запустить каждый модуль в отдельном терминале:


# shell
cd shell && npm run dev

# остальные (параллельно)
cd auth && npm run dev
cd records && npm run dev
cd ensembles && npm run dev
cd compositions && npm run dev
cd top && npm run dev
cd admin && npm run dev