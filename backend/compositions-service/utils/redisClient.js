const Redis = require('ioredis');
const redis = new Redis({ host: 'redis' });

redis.on('connect', () => {
  console.log('[✓] Redis connected in compositions-service');
});

redis.on('error', (err) => {
  console.error('[!] Redis error in compositions-service:', err.message);
});

module.exports = redis;
