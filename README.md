# 🎧 Музыкальный магазин (Music Store Platform)

Полнофункциональная информационная система для учёта, анализа и управления продажами музыкальных носителей (винил, CD) с поддержкой микрофронтендов, микросервисной архитектуры и административной панели.

## 🚀 Стек технологий

### Frontend
- React + Vite
- Redux Toolkit
- React Router
- Material UI (MUI)
- Axios
- Module Federation (micro-frontends)

### Backend
- Node.js + Express
- PostgreSQL + Prisma ORM
- Redis (кэширование)
- RabbitMQ (очереди)
- JWT (аутентификация)

### DevOps
- Docker + Docker Compose
- GitHub Actions (CI/CD)
- Prometheus + Grafana (мониторинг)

## ⚙️ Структура проекта

frontend/
├── shell/
├── auth/
├── records/
├── compositions/
├── ensembles/
├── top/
├── admin/

server/
├── auth-service/
├── records-service/
├── compositions-service/
├── ensembles-service/
├── top-service/



## 📦 Установка и запуск

```bash
git clone https://github.com/your-username/music-store.git
cd music-store
docker compose up --build
```
Проект доступен по адресу: http://localhost:3000

🔒 Авторизация
Admin: admin123@example.com / admin123

User: user123@example.com / user123

📊 Возможности
Регистрация / вход

Каталог пластинок с фильтрацией и сортировкой

Просмотр ансамблей, композиций и топов

Корзина и оформление заказа

Личный кабинет

Админ-панель: управление сущностями и статистика

✅ Тестирование
Юнит-тесты: Jest, @testing-library/react

Интеграционные тесты: Postman коллекции

Покрытие >85%
