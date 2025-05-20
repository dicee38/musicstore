const amqp = require('amqplib');

let channel;
let ready = false;

async function connect() {
  while (true) {
    try {
      const conn = await amqp.connect('amqp://rabbitmq');
      channel = await conn.createChannel();
      await channel.assertQueue('logs', { durable: true });
      ready = true;
      console.log('[✓] RabbitMQ connected from auth-service');
      break;
    } catch (err) {
      console.error('[!] RabbitMQ connection failed in auth-service, retrying in 3s:', err.message);
      await new Promise((res) => setTimeout(res, 3000));
    }
  }
}

connect();

async function publishLog(message) {
  if (!ready) return;
  console.log('[PUBLISHING][auth-service]', message);
  channel.sendToQueue('logs', Buffer.from(JSON.stringify(message)));
}

module.exports = { publishLog };
