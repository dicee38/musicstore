const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { InMemoryLRUCache } = require('apollo-server-caching');
const cookieParser = require('cookie-parser');

const app = express();
const mainPort = 3000;

const secretKey = 'your-secret-key'; // Токен секрет

// Подключаем middleware для обработки JSON тела запроса
app.use(express.json()); // Для парсинга JSON
app.use(cookieParser()); // Для работы с cookies

// Настройка CORS с учетом отправки cookies
app.use(cors({
  origin: 'http://localhost:5173', // Разрешаем только фронтенду на этом порту
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Разрешённые методы
  allowedHeaders: ['Content-Type', 'Authorization'], // Разрешённые заголовки
  credentials: true, // Разрешаем отправку cookies
}));

// Путь к файлам данных
const dataDir = path.join(__dirname, 'data');
const productsFilePath = path.join(dataDir, 'products.json');
const usersFilePath = path.join(dataDir, 'users.json');
const recordsFilePath = path.join(dataDir, 'records.json');
const ensemblesFilePath = path.join(dataDir, 'ensembles.json');
const compositionsFilePath = path.join(dataDir, 'compositions.json');
const topFilePath = path.join(dataDir, 'top.json');

// Схема GraphQL для товаров и дополнительных сущностей
const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    price: Float!
    description: String!
    categories: [String!]!
  }

  type Record {
    id: ID!
    title: String!
    artist: String!
    year: Int!
  }

  type Ensemble {
    id: ID!
    name: String!
    members: [String!]!
  }

  type Composition {
    id: ID!
    title: String!
    composer: String!
    genre: String!
  }

  type Top {
    id: ID!
    category: String!
    items: [String!]!
  }

  type Query {
    products: [Product]
    product(id: ID!): Product
    records: [Record]
    ensembles: [Ensemble]
    compositions: [Composition]
    top: [Top]
  }

  type Mutation {
    addProduct(name: String!, price: Float!, description: String!, categories: [String!]!): Product
    updateProduct(id: ID!, name: String, price: Float, description: String, categories: [String]): Product
    deleteProduct(id: ID!): String
    addRecord(title: String!, artist: String!, year: Int!): Record
    addEnsemble(name: String!, members: [String!]!): Ensemble
    addComposition(title: String!, composer: String!, genre: String!): Composition
    addTop(category: String!, items: [String!]!): Top
  }
`;

// Резолверы для GraphQL
const resolvers = {
  Query: {
    products: async () => {
      const data = fs.readFileSync(productsFilePath, 'utf8');
      const products = JSON.parse(data);
      products.forEach(product => {
        product.price = parseFloat(product.price);
      });
      return products;
    },
    product: async (_, { id }) => {
      const data = fs.readFileSync(productsFilePath, 'utf8');
      const products = JSON.parse(data);
      const product = products.find(p => p.id === parseInt(id));
      if (!product) throw new Error('Product not found');
      return product;
    },
    records: async () => {
      const data = fs.readFileSync(recordsFilePath, 'utf8');
      return JSON.parse(data);
    },
    ensembles: async () => {
      const data = fs.readFileSync(ensemblesFilePath, 'utf8');
      return JSON.parse(data);
    },
    compositions: async () => {
      const data = fs.readFileSync(compositionsFilePath, 'utf8');
      return JSON.parse(data);
    },
    top: async () => {
      const data = fs.readFileSync(topFilePath, 'utf8');
      return JSON.parse(data);
    },
  },
  Mutation: {
    addProduct: (_, { name, price, description, categories }) => {
      const data = fs.readFileSync(productsFilePath, 'utf8');
      const products = JSON.parse(data);
      const newProduct = {
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
        name,
        price,
        description,
        categories,
      };
      products.push(newProduct);
      fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
      return newProduct;
    },
    updateProduct: (_, { id, name, price, description, categories }) => {
      const data = fs.readFileSync(productsFilePath, 'utf8');
      let products = JSON.parse(data);
      const index = products.findIndex(p => p.id === parseInt(id));
      if (index === -1) return null;
      products[index] = { ...products[index], name, price, description, categories };
      fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
      return products[index];
    },
    deleteProduct: (_, { id }) => {
      const data = fs.readFileSync(productsFilePath, 'utf8');
      let products = JSON.parse(data);
      products = products.filter(p => p.id !== parseInt(id));
      fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
      return "Product deleted successfully";
    },
    addRecord: (_, { title, artist, year }) => {
      const data = fs.readFileSync(recordsFilePath, 'utf8');
      const records = JSON.parse(data);
      const newRecord = { id: Date.now().toString(), title, artist, year };
      records.push(newRecord);
      fs.writeFileSync(recordsFilePath, JSON.stringify(records, null, 2));
      return newRecord;
    },
    addEnsemble: (_, { name, members }) => {
      const data = fs.readFileSync(ensemblesFilePath, 'utf8');
      const ensembles = JSON.parse(data);
      const newEnsemble = { id: Date.now().toString(), name, members };
      ensembles.push(newEnsemble);
      fs.writeFileSync(ensemblesFilePath, JSON.stringify(ensembles, null, 2));
      return newEnsemble;
    },
    addComposition: (_, { title, composer, genre }) => {
      const data = fs.readFileSync(compositionsFilePath, 'utf8');
      const compositions = JSON.parse(data);
      const newComposition = { id: Date.now().toString(), title, composer, genre };
      compositions.push(newComposition);
      fs.writeFileSync(compositionsFilePath, JSON.stringify(compositions, null, 2));
      return newComposition;
    },
    addTop: (_, { category, items }) => {
      const data = fs.readFileSync(topFilePath, 'utf8');
      const topItems = JSON.parse(data);
      const newTop = { id: Date.now().toString(), category, items };
      topItems.push(newTop);
      fs.writeFileSync(topFilePath, JSON.stringify(topItems, null, 2));
      return newTop;
    },
  },
};

// Авторизация и регистрация пользователей
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send('Необходима авторизация');
  }
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).send('Не действительный токен');
    }
    req.user = user;
    next();
  });
};

// Регистрация пользователей
app.post('/api/auth/register', async (req, res) => {
  const { username, password } = req.body;
  const data = fs.readFileSync(usersFilePath, 'utf8');
  const users = JSON.parse(data);
  if (users.find(user => user.username === username)) {
    return res.status(400).send('Пользователь уже существует');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: users.length + 1, username, password: hashedPassword };
  users.push(newUser);
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  res.status(201).send('Пользователь зарегистрирован');
});

// Авторизация
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const data = fs.readFileSync(usersFilePath, 'utf8');
  const users = JSON.parse(data);
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(404).send('Пользователь не найден');
  }
  bcrypt.compare(password, user.password, (err, result) => {
    if (err || !result) {
      return res.status(403).send('Неверный пароль');
    }
    const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, secure: false }); // Устанавливаем cookie с токеном
    res.status(200).send('Авторизация успешна');
  });
});

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ user: req.user }), // Добавляем данные пользователя в контекст Apollo
    cache: new InMemoryLRUCache(),
  });

  await server.start(); // Запускаем ApolloServer

  server.applyMiddleware({ app }); // Применяем middleware после старта сервера

  app.listen(mainPort, () => {
    console.log(`Сервер запущен на http://localhost:${mainPort}`);
  });
};

startServer();
