const amqp = require('amqplib');

async function start() {
  while (true) {
    try {
      const conn = await amqp.connect('amqp://rabbitmq');
      const channel = await conn.createChannel();
      await channel.assertQueue('logs');
      console.log('[✓] Connected to RabbitMQ, waiting for messages...');

      channel.consume('logs', msg => {
        const content = JSON.parse(msg.content.toString());
        console.log('[LOG QUEUE]', content);
        channel.ack(msg);
      });
      break;
    } catch (err) {
      console.error('[!] RabbitMQ not ready, retrying in 3s...');
      await new Promise(res => setTimeout(res, 3000));
    }
  }
}

start();
