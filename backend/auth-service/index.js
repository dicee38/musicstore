const express = require('express');
const cors = require('cors');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const app = express();

const PORT = 4001;
const SECRET = 'musicstore-secret';
const USERS_FILE = './users.json';

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

const readUsers = () => JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
const writeUsers = (data) => fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2));

app.post('/api/register', async (req, res) => {
  const { username, password, role = 'user' } = req.body;
  const users = readUsers();
  if (users.find(u => u.username === username)) return res.status(400).send('User exists');
  const hash = await bcrypt.hash(password, 10);
  users.push({ id: Date.now(), username, password: hash, role });
  writeUsers(users);
  res.status(201).send('Registered');
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();
  const user = users.find(u => u.username === username);
  if (!user || !(await bcrypt.compare(password, user.password))) return res.status(403).send('Invalid login');
  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET);
  res.json({ token, username: user.username, role: user.role });
});

app.get('/api/profile', (req, res) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) return res.sendStatus(401);
  try {
    const token = auth.split(' ')[1];
    const payload = jwt.verify(token, SECRET);
    res.json(payload);
  } catch {
    res.sendStatus(403);
  }
});

app.listen(PORT, () => console.log(`Auth service on http://localhost:${PORT}`));
