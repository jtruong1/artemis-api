import fp from 'fastify-plugin';
import nodemailer from 'fastify-nodemailer';

async function mailPlugin(server, _opts) {
  const { config } = server;

  server.register(nodemailer, {
    host: config.MAIL_HOST,
    port: config.MAIL_PORT,
    secure: config.MAIL_PORT === 465,
    auth: {
      user: config.MAIL_USERNAME,
      pass: config.MAIL_PASSWORD,
    },
  });
}

export default fp(mailPlugin, { name: 'mail' });
