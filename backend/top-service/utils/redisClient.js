const Redis = require('ioredis');

const redis = new Redis({
  host: 'redis', // имя контейнера
  port: 6379,
  retryStrategy: times => Math.min(times * 50, 2000)
});

redis.on('connect', () => {
  console.log('[✓] Redis connected in top-service');
});

module.exports = redis;