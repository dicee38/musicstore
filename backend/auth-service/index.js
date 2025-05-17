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

// Регистрация
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ error: 'Пользователь уже существует' });

    const hash = await bcrypt.hash(password, 10);
    await prisma.user.create({ data: { email, password: hash, role: 'USER' } }); // 👈 важно

    res.status(201).json({ message: 'Регистрация прошла успешно' });
  } catch (err) {
    console.error('[REGISTER ERROR]', err);
    res.status(500).json({ error: 'Ошибка при регистрации' });
  }
});

// Вход
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(403).json({ error: 'Неверный логин или пароль' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      SECRET,
      { expiresIn: '7d' }
    );

    console.log('[LOGIN SUCCESS] token:', token); // 👈 лог

    res.json({ token, email: user.email, role: user.role });
  } catch (err) {
    console.error('[LOGIN ERROR]', err);
    res.status(500).json({ error: 'Ошибка при входе' });
  }
});

// Получение профиля
app.get('/api/profile', async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) return res.sendStatus(401);

  try {
    const token = auth.split(' ')[1];
    const payload = jwt.verify(token, SECRET);

    const user = await prisma.user.findUnique({ where: { id: payload.id } });
    if (!user) return res.sendStatus(404);

    res.json({
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      middleName: user.middleName,
      phone: user.phone,
      address: user.address
    });
  } catch (err) {
    console.error('[PROFILE ERROR]', err);
    res.sendStatus(403);
  }
});

// Обновление профиля
app.put('/api/profile', async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) return res.sendStatus(401);

  try {
    const token = auth.split(' ')[1];
    const payload = jwt.verify(token, SECRET);
    const { firstName, lastName, middleName, phone, address } = req.body;

    const updated = await prisma.user.update({
      where: { id: payload.id },
      data: { firstName, lastName, middleName, phone, address }
    });

    res.status(200).json(updated);
  } catch (err) {
    console.error('[PROFILE UPDATE ERROR]', err);
    res.status(500).json({ error: 'Ошибка при обновлении профиля' });
  }
});

// Получение полного профиля
app.get('/api/profile/full', async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) return res.sendStatus(401);

  try {
    const token = auth.split(' ')[1];
    const payload = jwt.verify(token, SECRET);

    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      include: {
        orders: {
          include: { records: true },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!user) return res.sendStatus(404);

    res.status(200).json({
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      middleName: user.middleName,
      phone: user.phone,
      address: user.address,
      orders: user.orders
    });
  } catch (err) {
    console.error('[FULL PROFILE ERROR]', err);
    res.status(500).json({ error: 'Ошибка при получении профиля' });
  }
});

// Создание заказа
app.post('/api/orders', async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) return res.sendStatus(401);

  try {
    const token = auth.split(' ')[1];
    const payload = jwt.verify(token, SECRET);
    const { items, total } = req.body;

    const order = await prisma.order.create({
      data: {
        total,
        userId: payload.id,
        records: {
          connect: items.map((id) => ({ id }))
        }
      }
    });

    res.status(201).json(order);
  } catch (err) {
    console.error('[ORDER CREATE ERROR]', err);
    res.status(500).json({ error: 'Ошибка при создании заказа' });
  }
});

// Получение заказов
app.get('/api/orders', async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) return res.sendStatus(401);

  try {
    const token = auth.split(' ')[1];
    const payload = jwt.verify(token, SECRET);

    const orders = await prisma.order.findMany({
      where: { userId: payload.id },
      include: { records: true },
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json(orders);
  } catch (err) {
    console.error('[ORDER FETCH ERROR]', err);
    res.status(500).json({ error: 'Ошибка при получении заказов' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Auth service running on http://localhost:${PORT}`);
});
