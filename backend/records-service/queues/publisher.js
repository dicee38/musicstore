const amqp = require('amqplib');

let channel;
let ready = false;

async function connect() {
  const conn = await amqp.connect('amqp://rabbitmq');
  channel = await conn.createChannel();
  await channel.assertQueue('logs');
  ready = true;
}

connect().catch(console.error);

async function publishLog(message) {
  if (!ready) return;
  console.log('[PUBLISHING]', message); // добавлено логирование
  channel.sendToQueue('logs', Buffer.from(JSON.stringify(message)));
}

module.exports = { publishLog };
