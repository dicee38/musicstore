const { PrismaClient } = require('@prisma/client');
const { publishLog } = require('../queues/publisher');
const redis = require('../utils/redisClient');

const prisma = new PrismaClient();

exports.create = async (data) => {
  const record = await prisma.record.create({ data });
  await publishLog({ event: 'CREATE_RECORD', data: record });

  await redis.del('records:all'); // сброс кэша общего списка
  return record;
};

exports.update = async (id, data) => {
  const updated = await prisma.record.update({ where: { id }, data });
  await publishLog({ event: 'UPDATE_RECORD', data: updated });

  await redis.del(`records:${id}`);
  await redis.del('records:all');
  return updated;
};

exports.remove = async (id) => {
  const existing = await prisma.record.findUnique({ where: { id } });
  if (!existing) return null;

  const deleted = await prisma.record.delete({ where: { id } });
  await publishLog({ event: 'DELETE_RECORD', data: deleted });

  await redis.del(`records:${id}`);
  await redis.del('records:all');
  return deleted;
};

exports.getAll = async () => {
  const cache = await redis.get('records:all');
  if (cache) {
    console.log('[CACHE] Returned all records from Redis');
    return JSON.parse(cache);
  }

  const records = await prisma.record.findMany({ include: { ensemble: true } });
  await redis.set('records:all', JSON.stringify(records), 'EX', 60); // 60 секунд
  return records;
};

exports.getById = async (id) => {
  const key = `records:${id}`;
  const cache = await redis.get(key);
  if (cache) {
    console.log(`[CACHE] Returned record ${id} from Redis`);
    return JSON.parse(cache);
  }

  const record = await prisma.record.findUnique({
    where: { id },
    include: { ensemble: true },
  });

  if (record) await redis.set(key, JSON.stringify(record), 'EX', 60);
  return record;
};
