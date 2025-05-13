const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = 4003;

app.use(cors());
app.use(express.json());

/**
 * Получить все ансамбли
 */
app.get('/api/ensembles', async (req, res) => {
  try {
    const ensembles = await prisma.ensemble.findMany({
      include: { musicians: true, records: true, compositions: true },
    });
    res.json(ensembles);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при получении ансамблей' });
  }
});

/**
 * Получить ансамбль по id
 */
app.get('/api/ensembles/:id', async (req, res) => {
  try {
    const ensemble = await prisma.ensemble.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { musicians: true, records: true, compositions: true },
    });
    if (!ensemble) return res.sendStatus(404);
    res.json(ensemble);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при получении ансамбля' });
  }
});

/**
 * Создать ансамбль
 */
app.post('/api/ensembles', async (req, res) => {
  const { name } = req.body;
  try {
    const newEnsemble = await prisma.ensemble.create({
      data: { name },
    });
    res.status(201).json(newEnsemble);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при создании ансамбля' });
  }
});

/**
 * Обновить ансамбль
 */
app.put('/api/ensembles/:id', async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await prisma.ensemble.update({
      where: { id: parseInt(req.params.id) },
      data: { name },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при обновлении ансамбля' });
  }
});

/**
 * Удалить ансамбль
 */
app.delete('/api/ensembles/:id', async (req, res) => {
  try {
    await prisma.ensemble.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при удалении ансамбля' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Ensembles service running on http://localhost:${PORT}`);
});
