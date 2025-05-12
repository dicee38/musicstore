const express = require('express');
const cors = require('cors');
const app = express();

const PORT = 4006;
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Admin service ready (stub)');
});

app.listen(PORT, () => console.log(`✅ Admin service running on http://localhost:${PORT}`));
