const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const recordRoutes = require('./routers/recordRoutes');
const client = require('prom-client'); // 🆕
const app = express();
const PORT = 4002;

// 🆕 Создаём реестр и собираем стандартные метрики
const register = new client.Registry();
client.collectDefaultMetrics({ register });
register.setDefaultLabels({ service: 'records-service' });

app.use(cors());
app.use(express.json());
app.use(errorHandler);

// 🆕 Эндпоинт для Prometheus
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    res.status(500).end(err.message);
  }
});

// Роуты
app.use('/api/records', recordRoutes);

app.listen(PORT, () => {
  console.log(`✅ Records service running on http://localhost:${PORT}`);
});
