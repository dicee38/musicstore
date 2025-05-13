const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = 4002;

app.use(cors());
app.use(express.json());

/**
 * Получить все записи
 */
app.get('/api/records', async (req, res) => {
  try {
    const records = await prisma.record.findMany({
      include: { ensemble: true },
    });
    res.json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при получении записей' });
  }
});

/**
 * Получить запись по id
 */
app.get('/api/records/:id', async (req, res) => {
  try {
    const record = await prisma.record.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { ensemble: true },
    });
    if (!record) return res.sendStatus(404);
    res.json(record);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при получении записи' });
  }
});

/**
 * Создать запись
 */
app.post('/api/records', async (req, res) => {
  const { title, year, description, sales = 0, ensembleId = null, price } = req.body;
  try {
    const newRecord = await prisma.record.create({
      data: {
        title,
        year,
        description,
        sales,
        ensembleId,
        price,
      },
    });
    res.status(201).json(newRecord);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при создании записи' });
  }
});

/**
 * Обновить запись
 */
app.put('/api/records/:id', async (req, res) => {
  const { title, year, description, sales, ensembleId } = req.body;
  try {
    const updated = await prisma.record.update({
      where: { id: parseInt(req.params.id) },
      data: { title, year, description, sales, ensembleId },
    });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при обновлении записи' });
  }
});

/**
 * Удалить запись
 */
app.delete('/api/records/:id', async (req, res) => {
  try {
    await prisma.record.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при удалении записи' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Records service running on http://localhost:${PORT}`);
});
