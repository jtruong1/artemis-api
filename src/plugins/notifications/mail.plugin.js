import fp from 'fastify-plugin';
import nodemailer from 'fastify-nodemailer';
import mailConfig from '../../configs/mail.config.js';

async function mailPlugin(server, _opts) {
  const { fromAddress, fromName, ...options } = mailConfig;

  server.register(nodemailer, {
    ...options,
  });
}

export default fp(mailPlugin, { name: 'mail' });
