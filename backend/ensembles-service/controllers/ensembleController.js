const { PrismaClient } = require('@prisma/client');
const redis = require('../utils/redisClient');
const prisma = new PrismaClient();

const CACHE_KEY = 'ensembles:all';

exports.getAllEnsembles = async (req, res) => {
  try {
    const cached = await redis.get(CACHE_KEY);
    if (cached) {
      console.log('[CACHE] ensembles returned from Redis');
      return res.json(JSON.parse(cached));
    }

    const ensembles = await prisma.ensemble.findMany({
      include: { musicians: true, records: true },
    });

    await redis.set(CACHE_KEY, JSON.stringify(ensembles), 'EX', 60);
    res.json(ensembles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEnsembleById = async (req, res) => {
  try {
    const ensemble = await prisma.ensemble.findUnique({
      where: { id: Number(req.params.id) },
      include: { musicians: true, records: true },
    });
    if (!ensemble) return res.sendStatus(404);
    res.json(ensemble);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createEnsemble = async (req, res) => {
  try {
    const created = await prisma.ensemble.create({ data: req.body });
    await redis.del(CACHE_KEY);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateEnsemble = async (req, res) => {
  try {
    const updated = await prisma.ensemble.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    await redis.del(CACHE_KEY);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteEnsemble = async (req, res) => {
  try {
    await prisma.ensemble.delete({ where: { id: Number(req.params.id) } });
    await redis.del(CACHE_KEY);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
