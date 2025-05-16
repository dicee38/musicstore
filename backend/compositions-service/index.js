const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = 4004;

app.use(cors());
app.use(express.json());

/**
 * Получить все композиции
 */
app.get('/api/compositions', async (req, res) => {
  try {
    const compositions = await prisma.composition.findMany({
      include: { ensembles: true, records: true },
    });
    res.json(compositions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при получении композиций' });
  }
});

/**
 * Получить одну композицию
 */
app.get('/api/compositions/:id', async (req, res) => {
  try {
    const composition = await prisma.composition.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { ensembles: true, records: true },
    });
    if (!composition) return res.sendStatus(404);
    res.json(composition);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при получении композиции' });
  }
});

/**
 * Создать композицию
 */
app.post('/api/compositions', async (req, res) => {
  const { title, composer, description } = req.body;
  try {
    const newComposition = await prisma.composition.create({
      data: { title, composer, description },
    });
    res.status(201).json(newComposition);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при создании композиции' });
  }
});

/**
 * Обновить композицию
 */
app.put('/api/compositions/:id', async (req, res) => {
  const { title, composer, description } = req.body;
  try {
    const updated = await prisma.composition.update({
      where: { id: parseInt(req.params.id) },
      data: { title, composer, description },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при обновлении композиции' });
  }
});

/**
 * Удалить композицию
 */
app.delete('/api/compositions/:id', async (req, res) => {
  try {
    await prisma.composition.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при удалении композиции' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Compositions service running on http://localhost:${PORT}`);
});
