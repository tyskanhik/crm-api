# CRM System API 🚀

Простая и эффективная CRM система для управления заявками поддержки с возможностью прикрепления файлов.

## ✨ Возможности

-   ✅ Создание, чтение, обновление и удаление заявок
-   ✅ Фильтрация заявок по статусу (новая, в работе, закрыта)
-   ✅ Приоритизация заявок (низкий, средний, высокий)
-   ✅ Загрузка и управление файлами (скриншоты, логи, документы)
-   ✅ Автоматическая генерация документации API (Swagger)
-   ✅ Контейнеризация с Docker
-   ✅ Хранение файлов в MinIO (S3-совместимое хранилище)
-   ✅ PostgreSQL для надежного хранения данных

## 🛠 Технологии

### Backend
-   **NestJS** - фреймворк для построения эффективных и масштабируемых серверных приложений
-   **TypeORM** - ORM для работы с PostgreSQL
-   **PostgreSQL** - реляционная база данных
-   **MinIO** - S3-совместимое object storage для файлов
-   **Swagger** - автоматическая документация API
-   **Docker** - контейнеризация приложения

## 🏗 Архитектура

Проект использует чистую архитектуру с разделением на слои:

```text
src/
├── modules/          # Бизнес-модули
│   ├── tickets/     # Модуль заявок
│   └── attachments/ # Модуль вложений
├── shared/          # Общие модули
│   ├── database/    # Работа с БД
│   └── storage/     # Работа с файловым хранилищем
└── config/          # Конфигурации
```

### Паттерн проектирования

-   **Repository Pattern** - абстракция доступа к данным
-   **Dependency Injection** - внедрение зависимостей
-   **Separation of Concerns** - разделение ответственности

## 📦 Установка

### Предварительные требования
-   Node.js 18+
-   Docker и Docker Compose
-   npm или yarn

### Клонирование репозитория

```bash
git clone <https://github.com/tyskanhik/crm-api>
cd crm-api
```

### Установка зависимостей

```bash
npm install
```

## 🚀 Запуск

### Запуск инфраструктуры (Docker)

```bash
# Запуск PostgreSQL и MinIO
docker-compose up -d
```

### Запуск бэкенда

```bash
npm run start:dev
```

Приложение будет доступно:

-   Backend API: [http://localhost:3000](http://localhost:3000/)
-   Swagger Docs: [http://localhost:3000/api](http://localhost:3000/api)
-   MinIO Console: [http://localhost:9001](http://localhost:9001/) (minioadmin/minioadmin)

## 📡 API Endpoints

### 🎫 Управление заявками

Получить все заявки
`GET`
`/tickets`

Фильтрация по статусу
`GET`
`/tickets?status=new`

Получить конкретную заявку
`GET`
`/tickets/:id`

Создать новую заявку
`POST`
`/tickets`

Обновить заявку
`PATCH`
`/tickets/:id`

Удалить заявку
`DELETE`
`/tickets/:id`



### 📎 Управление файлами

Получить файлы заявки
`GET`
`/tickets/:ticketId/attachments`

Загрузить файл
`POST`
`/tickets/:ticketId/attachments`

Скачать файл
`GET`
`/tickets/:ticketId/attachments/:fileId/download`

Удалить файл
`DELETE`
`/tickets/:ticketId/attachments/:fileId`

## ⚙️ Конфигурация

### Environment Variables

Создайте файл `.env` в корне проекта:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=crm_api

# MinIO
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_USE_SSL=false
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_BUCKET=attachments

# App
NODE_ENV=development
PORT=3000
```