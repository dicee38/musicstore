const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

const PORT = 4002;
const FILE = './records.json';

app.use(cors());
app.use(express.json());

const readData = () => JSON.parse(fs.readFileSync(FILE, 'utf8'));
const writeData = (data) => fs.writeFileSync(FILE, JSON.stringify(data, null, 2));

app.get('/api/records', (req, res) => res.json(readData()));
app.get('/api/records/:id', (req, res) => {
  const records = readData();
  const record = records.find(r => r.id === req.params.id);
  record ? res.json(record) : res.sendStatus(404);
});

app.post('/api/records', (req, res) => {
  const records = readData();
  const newRecord = { id: Date.now().toString(), ...req.body };
  records.push(newRecord);
  writeData(records);
  res.status(201).json(newRecord);
});

app.listen(PORT, () => console.log(`Records service on http://localhost:${PORT}`));
