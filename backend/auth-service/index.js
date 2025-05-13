const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

const PORT = 4001;
const SECRET = 'musicstore-secret';

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.post('/api/register', async (req, res) => {
  const { email, password, role = 'USER' } = req.body;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(400).send('User already exists');

  const hash = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: { email, password: hash, role }
  });

  res.status(201).send('Registered');
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(403).send('Invalid login');
  }

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET);
  res.json({ token, email: user.email, role: user.role });
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

app.listen(PORT, () => console.log(`✅ Auth service running on http://localhost:${PORT}`));
