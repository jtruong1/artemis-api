require('dotenv').config();

const config = {
  name: process.env.APP_NAME || 'Artemis',
  key: process.env.APP_KEY || 'secret',
  port: process.env.APP_PORT || 3000,
  hash: {
    saltRounds: 10,
  },
  mailgun: {
    apiUrl: process.env.MAILGUN_API_URL,
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  },
};

module.exports = config;
