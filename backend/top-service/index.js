const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

const PORT = 4005;
const FILE = './top.json';

app.use(cors());
app.use(express.json());

const readData = () => JSON.parse(fs.readFileSync(FILE, 'utf8') || '[]');

app.get('/api/top', (req, res) => {
  const top = readData().sort((a, b) => b.sales - a.sales).slice(0, 10);
  res.json(top);
});

app.listen(PORT, () => console.log(`✅ Top service running on http://localhost:${PORT}`));
