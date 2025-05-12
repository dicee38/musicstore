# 🎧 MusicStore Backend (Microservices)

Микросервисный backend для проекта "MusicStore", подключённый к frontend-архитектуре на microfrontends (React + Vite).

---

## 📦 Сервисы:

| Сервис             | Назначение                         | Порт |
|--------------------|------------------------------------|------|
| auth-service        | Регистрация, логин, JWT            | 4001 |
| records-service     | Каталог пластинок (CRUD)          | 4002 |
| ensembles-service   | Ансамбли и участники              | 4003 |
| compositions-service| Произведения                      | 4004 |
| top-service         | Топ продаж                        | 4005 |
| admin-service       | Stub / proxy                      | 4006 |

---

## 🐳 Запуск (всё одним командой)

### 1. Установить Docker:
https://www.docker.com/products/docker-desktop

### 2. Запуск проекта:
```bash
docker-compose up --build
