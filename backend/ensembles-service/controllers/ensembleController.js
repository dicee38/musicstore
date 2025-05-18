const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllMusicians = async (req, res) => {
  try {
    const musicians = await prisma.musician.findMany({ include: { ensemble: true } });
    res.json(musicians);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMusicianById = async (req, res) => {
  try {
    const musician = await prisma.musician.findUnique({
      where: { id: Number(req.params.id) },
      include: { ensemble: true },
    });
    if (!musician) return res.sendStatus(404);
    res.json(musician);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createMusician = async (req, res) => {
  try {
    const created = await prisma.musician.create({ data: req.body });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMusician = async (req, res) => {
  try {
    const updated = await prisma.musician.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteMusician = async (req, res) => {
  try {
    await prisma.musician.delete({ where: { id: Number(req.params.id) } });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
