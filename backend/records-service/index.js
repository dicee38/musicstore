const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const recordRoutes = require('./routers/recordRoutes');

const app = express();
const PORT = 4002;

app.use(cors());
app.use(express.json());
app.use(errorHandler);

// Подключаем маршруты
app.use('/api/records', recordRoutes);

app.listen(PORT, () => {
  console.log(`✅ Records service running on http://localhost:${PORT}`);
});
