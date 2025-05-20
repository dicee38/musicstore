const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const Redis = require('ioredis');

const app = express();
const prisma = new PrismaClient();
const redis = new Redis({ host: 'redis', port: 6379 });

const PORT = 4005;

app.use(cors());
app.use(express.json());

redis.on('connect', () => {
  console.log('[✓] Redis connected in top-service');
});

/**
 * Получить топ 10 записей по продажам
 */
app.get('/api/top', async (req, res) => {
  try {
    const cached = await redis.get('top:records');
    if (cached) {
      console.log('[CACHE] Returned from Redis');
      return res.json(JSON.parse(cached));
    }

    const topRecords = await prisma.record.findMany({
      orderBy: { sales: 'desc' },
      take: 10,
    });

    await redis.set('top:records', JSON.stringify(topRecords), 'EX', 60); // TTL = 60 сек
    res.json(topRecords);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при получении топа' });
  }
});

/**
 * Получить все категории топов
 */
app.get('/api/top/categories', async (req, res) => {
  try {
    const categories = await prisma.top.findMany();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при получении категорий' });
  }
});

/**
 * Получить конкретную категорию топа
 */
app.get('/api/top/categories/:id', async (req, res) => {
  try {
    const top = await prisma.top.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!top) return res.sendStatus(404);
    res.json(top);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при получении категории' });
  }
});

/**
 * Добавить новую категорию топа
 */
app.post('/api/top/categories', async (req, res) => {
  const { category, items } = req.body;
  try {
    const newTop = await prisma.top.create({
      data: { category, items },
    });
    await redis.del('top:records'); // сброс кэша
    res.status(201).json(newTop);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при создании категории' });
  }
});

/**
 * Обновить категорию топа
 */
app.put('/api/top/categories/:id', async (req, res) => {
  const { category, items } = req.body;
  try {
    const updated = await prisma.top.update({
      where: { id: parseInt(req.params.id) },
      data: { category, items },
    });
    await redis.del('top:records'); // сброс кэша
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при обновлении категории' });
  }
});

/**
 * Удалить категорию топа
 */
app.delete('/api/top/categories/:id', async (req, res) => {
  try {
    await prisma.top.delete({
      where: { id: parseInt(req.params.id) },
    });
    await redis.del('top:records'); // сброс кэша
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при удалении категории' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Top service running on http://localhost:${PORT}`);
});
