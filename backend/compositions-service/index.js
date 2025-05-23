const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const redis = require('./utils/redisClient');

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
    const cache = await redis.get('compositions:all');
    if (cache) {
      console.log('[CACHE] Returned compositions list from Redis');
      return res.json(JSON.parse(cache));
    }

    const compositions = await prisma.composition.findMany({
      include: { ensembles: true, records: true },
    });

    await redis.set('compositions:all', JSON.stringify(compositions), 'EX', 60);
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
  const id = parseInt(req.params.id);
  const key = `compositions:${id}`;
  try {
    const cache = await redis.get(key);
    if (cache) {
      console.log(`[CACHE] Returned composition ${id} from Redis`);
      return res.json(JSON.parse(cache));
    }

    const composition = await prisma.composition.findUnique({
      where: { id },
      include: { ensembles: true, records: true },
    });
    if (!composition) return res.sendStatus(404);

    await redis.set(key, JSON.stringify(composition), 'EX', 60);
    res.json(composition);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при получении композиции' });
  }
});

/**
 * Создать композицию с привязкой к записи
 */
app.post('/api/compositions', async (req, res) => {
  const { title, composer, description, recordId } = req.body;
  try {
    const newComposition = await prisma.composition.create({
      data: {
        title,
        composer,
        description,
        records: {
          connect: [{ id: parseInt(recordId) }]
        }
      }
    });

    await redis.del('compositions:all'); // сбрасываем список
    res.status(201).json(newComposition);
  } catch (err) {
    console.error('[CREATE COMPOSITION ERROR]', err);
    res.status(500).json({ error: 'Ошибка при создании композиции' });
  }
});

/**
 * Обновить композицию
 */
app.put('/api/compositions/:id', async (req, res) => {
  const { title, composer, description } = req.body;
  const id = parseInt(req.params.id);
  try {
    const updated = await prisma.composition.update({
      where: { id },
      data: { title, composer, description },
    });

    await redis.del(`compositions:${id}`);
    await redis.del('compositions:all');
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при обновлении композиции' });
  }
});

/**
 * Удалить композицию
 */
app.delete('/api/compositions/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.composition.delete({ where: { id } });

    await redis.del(`compositions:${id}`);
    await redis.del('compositions:all');
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при удалении композиции' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Compositions service running on http://localhost:${PORT}`);
});
