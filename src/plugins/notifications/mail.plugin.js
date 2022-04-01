const fp = require('fastify-plugin');
const nodemailerPlugin = require('fastify-nodemailer');
const mailConfig = require('../../configs/mail.config');

async function mailPlugin(server, opts) {
  const { fromAddress, fromName, ...options } = mailConfig;

  server.register(nodemailerPlugin, {
    ...options,
  });
}

module.exports = fp(mailPlugin);
