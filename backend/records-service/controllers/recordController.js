const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.getAllRecords = async (req, res) => {
  try {
    const records = await prisma.record.findMany()
    res.json(records)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.getRecordById = async (req, res) => {
  try {
    const record = await prisma.record.findUnique({
      where: { id: Number(req.params.id) },
    })
    if (!record) return res.status(404).json({ error: 'Record not found' })
    res.json(record)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.createRecord = async (req, res) => {
  try {
    const newRecord = await prisma.record.create({
      data: req.body,
    })
    res.status(201).json(newRecord)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

exports.updateRecord = async (req, res) => {
  try {
    const updated = await prisma.record.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    })
    res.json(updated)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

exports.deleteRecord = async (req, res) => {
  try {
    await prisma.record.delete({
      where: { id: Number(req.params.id) },
    })
    res.json({ message: 'Deleted successfully' })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
