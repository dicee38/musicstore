const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

const PORT = 4004;
const FILE = './compositions.json';

app.use(cors());
app.use(express.json());

const readData = () => JSON.parse(fs.readFileSync(FILE, 'utf8') || '[]');
const writeData = (data) => fs.writeFileSync(FILE, JSON.stringify(data, null, 2));

app.get('/api/compositions', (req, res) => res.json(readData()));
app.get('/api/compositions/:id', (req, res) => {
  const data = readData();
  const found = data.find(i => i.id === req.params.id);
  found ? res.json(found) : res.sendStatus(404);
});
app.post('/api/compositions', (req, res) => {
  const data = readData();
  const newItem = { id: Date.now().toString(), ...req.body };
  data.push(newItem);
  writeData(data);
  res.status(201).json(newItem);
});

app.listen(PORT, () => console.log(`✅ Compositions service running on http://localhost:${PORT}`));
