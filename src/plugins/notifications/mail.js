const fp = require('fastify-plugin');
const nodemailerPlugin = require('fastify-nodemailer');
const config = require('../../utils/config');

async function mailPlugin(server, opts) {
  const { fromAddress, fromName, ...options } = config.mail;

  server.register(nodemailerPlugin, {
    ...options,
  });
}

module.exports = fp(mailPlugin);
