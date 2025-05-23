const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createMusician = async (req, res) => {
  try {
    const { name, instrument, ensembleId } = req.body;
    const musician = await prisma.musician.create({
      data: {
        name,
        instrument,
        ensemble: { connect: { id: Number(ensembleId) } }
      }
    });
    res.status(201).json(musician);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllMusicians = async (req, res) => {
  try {
    const musicians = await prisma.musician.findMany({
      include: { ensemble: true }
    });
    res.json(musicians);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMusicianById = async (req, res) => {
  try {
    const musician = await prisma.musician.findUnique({
      where: { id: Number(req.params.id) },
      include: { ensemble: true }
    });
    if (!musician) return res.sendStatus(404);
    res.json(musician);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMusician = async (req, res) => {
  try {
    const updated = await prisma.musician.update({
      where: { id: Number(req.params.id) },
      data: req.body
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteMusician = async (req, res) => {
  try {
    await prisma.musician.delete({
      where: { id: Number(req.params.id) }
    });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
