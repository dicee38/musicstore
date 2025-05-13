const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = 4005;

app.use(cors());
app.use(express.json());

/**
 * Получить топ 10 записей по продажам
 */
app.get('/api/top', async (req, res) => {
  try {
    const topRecords = await prisma.record.findMany({
      orderBy: { sales: 'desc' },
      take: 10,
    });
    res.json(topRecords);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при получении топа' });
  }
});

/**
 * (Опционально) Получить топовые категории (ручные)
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
 * (Опционально) Добавить новую категорию топа
 */
app.post('/api/top/categories', async (req, res) => {
  const { category, items } = req.body;
  try {
    const newTop = await prisma.top.create({
      data: { category, items },
    });
    res.status(201).json(newTop);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при создании категории' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Top service running on http://localhost:${PORT}`);
});
