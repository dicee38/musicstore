const Redis = require('ioredis');
const redis = new Redis({ host: 'redis' }); // имя контейнера в docker-compose

redis.on('connect', () => {
  console.log('[✓] Redis connected in records-service');
});

redis.on('error', (err) => {
  console.error('[!] Redis error in records-service:', err.message);
});

module.exports = redis;
