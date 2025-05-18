const recordService = require('../services/recordService');
const amqp = require('amqplib');

async function publishLogMessage(data) {
  try {
    const conn = await amqp.connect('amqp://rabbitmq');
    const channel = await conn.createChannel();
    await channel.assertQueue('logs');
    channel.sendToQueue('logs', Buffer.from(JSON.stringify(data)));
    await channel.close();
    await conn.close();
  } catch (err) {
    console.error('[!] Failed to publish message to RabbitMQ:', err.message);
  }
}

exports.getAllRecords = async (req, res) => {
  try {
    const records = await recordService.getAll();
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRecordById = async (req, res) => {
  try {
    const record = await recordService.getById(Number(req.params.id));
    if (!record) return res.status(404).json({ error: 'Record not found' });
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createRecord = async (req, res) => {
  try {
    const newRecord = await recordService.create(req.body);
    await publishLogMessage({ type: 'record_created', record: newRecord });
    res.status(201).json(newRecord);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateRecord = async (req, res) => {
  try {
    const updated = await recordService.update(Number(req.params.id), req.body);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteRecord = async (req, res) => {
  try {
    await recordService.remove(Number(req.params.id));
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
