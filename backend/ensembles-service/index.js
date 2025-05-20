const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const ensembleRoutes = require('./routers/ensembleRouters');

const app = express();
const prisma = new PrismaClient();
const PORT = 4003;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/ensembles', ensembleRoutes);

app.listen(PORT, () => {
  console.log(`✅ Ensembles service running on http://localhost:${PORT}`);
});
