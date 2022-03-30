const fp = require('fastify-plugin');
const mailgun = require('mailgun-js');
const config = require('../../utils/config');

async function mailgunPlugin(server, opts) {
  const mg = mailgun({
    apiKey: config.mailgun.apiKey,
    domain: config.mailgun.domain,
  });

  server.decorate('mailgun', mg);
}

module.exports = fp(mailgunPlugin);
