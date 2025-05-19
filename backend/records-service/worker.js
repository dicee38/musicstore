const amqp = require('amqplib');
const winston = require('winston');

// Создаем winston логгер
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs.log' }),
    new winston.transports.Console()
  ],
});

async function start() {
  while (true) {
    try {
      const conn = await amqp.connect('amqp://rabbitmq');
      const channel = await conn.createChannel();
      const queue = 'logs';

      await channel.assertQueue(queue, { durable: true });
      console.log('[✓] Worker connected to RabbitMQ and listening on logs queue');

      channel.consume(queue, msg => {
        if (msg !== null) {
          try {
            const logMsg = JSON.parse(msg.content.toString());
            logger.info({ from: 'log-queue', message: logMsg });

            console.log('[LOG QUEUE]', logMsg);
            channel.ack(msg);
          } catch (parseErr) {
            console.error('[!] Failed to parse log message:', parseErr);
            channel.nack(msg);
          }
        }
      }, { noAck: false });

      break; // Всё норм, больше не ретраим
    } catch (err) {
      console.error('[!] RabbitMQ not ready or failed to connect. Retrying in 3s...', err.message);
      await new Promise(res => setTimeout(res, 3000));
    }
  }
}

start();
