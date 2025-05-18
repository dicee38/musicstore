const { PrismaClient } = require('@prisma/client');
const { publishLog } = require('../queues/publisher');

const prisma = new PrismaClient();

exports.create = async (data) => {
  const record = await prisma.record.create({ data });
  await publishLog({ event: 'CREATE_RECORD', data: record });
  return record;
};

exports.update = async (id, data) => {
  const updated = await prisma.record.update({ where: { id }, data });
  await publishLog({ event: 'UPDATE_RECORD', data: updated });
  return updated;
};

exports.remove = async (id) => {
  const deleted = await prisma.record.delete({ where: { id } });
  await publishLog({ event: 'DELETE_RECORD', data: deleted });
  return deleted;
};

exports.getAll = () => prisma.record.findMany({ include: { ensemble: true } });

exports.getById = (id) =>
  prisma.record.findUnique({ where: { id }, include: { ensemble: true } });
