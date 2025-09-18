-- Создание расширения для UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Таблица tickets
CREATE TABLE IF NOT EXISTS tickets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    priority VARCHAR(20) NOT NULL DEFAULT 'medium',
    status VARCHAR(20) NOT NULL DEFAULT 'new',
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Таблица attachments
CREATE TABLE IF NOT EXISTS attachments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "objectName" VARCHAR(255) NOT NULL DEFAULT '',
    "originalName" VARCHAR(255) NOT NULL,
    mimetype VARCHAR(100) NOT NULL,
    size INTEGER NOT NULL,
    "ticketId" UUID NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_ticket FOREIGN KEY("ticketId") REFERENCES tickets(id) ON DELETE CASCADE
);

-- Начальные данные для tickets
INSERT INTO tickets (id, title, description, priority, status, "createdAt", "updatedAt") VALUES
(
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890'::uuid,
    'Проблема с доступом в систему',
    'Не могу войти в свой аккаунт, выдает ошибку аутентификации. Проблема возникает уже второй день.',
    'high',
    'new',
    '2024-01-15 10:00:00+00',
    '2024-01-15 10:00:00+00'
),
(
    'b2c3d4e5-f6a7-8901-bcde-f23456789012'::uuid,
    'Медленная работа приложения',
    'Приложение работает очень медленно, особенно при открытии больших отчетов. Нужна оптимизация.',
    'medium',
    'in_progress',
    '2024-01-14 15:30:00+00',
    '2024-01-15 09:00:00+00'
),
(
    'c3d4e5f6-789a-9012-cdef-345678901234'::uuid,
    'Ошибка в финансовом отчете',
    'В отчете за январь неправильно считаются итоговые суммы в разделе "Расходы".',
    'low',
    'closed',
    '2024-01-10 08:00:00+00',
    '2024-01-12 16:45:00+00'
);

-- Начальные данные для attachments
INSERT INTO attachments (id, "objectName", "originalName", mimetype, size, "ticketId", "createdAt", "updatedAt") VALUES
(
    'd4e5f6a7-b8c9-0123-dead-456789012345'::uuid,
    'screenshot-error.png',
    'screenshot-error.png',
    'image/png',
    102400,
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890'::uuid,
    '2024-01-15 10:05:00+00',
    '2024-01-15 10:05:00+00'
),
(
    'e5f6a7b8-c9d0-1234-efab-567890123456'::uuid,
    'performance-log.txt',
    'performance-log.txt',
    'text/plain',
    51200,
    'b2c3d4e5-f6a7-8901-bcde-f23456789012'::uuid,
    '2024-01-14 16:00:00+00',
    '2024-01-14 16:00:00+00'
);