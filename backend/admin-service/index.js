const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = 4006;

app.use(cors());
app.use(express.json());

// ================== Универсальный CRUD ==================
function createCrudRoutes(model, include = undefined) {
  const route = `/api/${model.toLowerCase()}s`;

  app.get(route, async (req, res) => {
    const data = await prisma[model].findMany({ include });
    res.json(data);
  });

  app.get(`${route}/:id`, async (req, res) => {
    const id = +req.params.id;
    const data = await prisma[model].findUnique({ where: { id }, include });
    data ? res.json(data) : res.status(404).json({ error: 'Не найдено' });
  });

  app.post(route, async (req, res) => {
    const created = await prisma[model].create({ data: req.body });
    res.status(201).json(created);
  });

  app.put(`${route}/:id`, async (req, res) => {
    const id = +req.params.id;
    try {
      const updated = await prisma[model].update({ where: { id }, data: req.body });
      res.json(updated);
    } catch {
      res.status(404).json({ error: 'Не найдено' });
    }
  });

  app.delete(`${route}/:id`, async (req, res) => {
    const id = +req.params.id;
    try {
      await prisma[model].delete({ where: { id } });
      res.sendStatus(204);
    } catch {
      res.status(404).json({ error: 'Не найдено' });
    }
  });
}
app.get('/api/stats', async (req, res) => {
  try {
    const stats = {
      records: await prisma.record.count(),
      compositions: await prisma.composition.count(),
      ensembles: await prisma.ensemble.count(),
      musicians: await prisma.musician.count(),
      companies: await prisma.company.count(),
      sales: await prisma.order.aggregate({
        _sum: { total: true }
      }).then(r => r._sum.total || 0)
    };

    res.json(stats);
  } catch (err) {
    console.error('Ошибка при получении статистики:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});


// ================== Генерация маршрутов ==================
createCrudRoutes('User', { orders: true });
createCrudRoutes('Order', { records: true, user: true });
createCrudRoutes('Record', { ensemble: true, compositions: true });
createCrudRoutes('Ensemble', { musicians: true, compositions: true, records: true });
createCrudRoutes('Composition', { ensembles: true, records: true });
createCrudRoutes('Musician', { ensemble: true });
createCrudRoutes('Company');
createCrudRoutes('Top');

app.get('/', (req, res) => res.send('✅ Admin service is running'));

app.listen(PORT, () => {
  console.log(`✅ Admin service running on http://localhost:${PORT}`);
});
