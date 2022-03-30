require('dotenv').config();

const config = {
  name: process.env.APP_NAME || 'Artemis',
  key: process.env.APP_KEY || 'secret',
  port: process.env.APP_PORT || 3000,
  hash: {
    saltRounds: 10,
  },
  mail: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    // secure: true,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
    fromAddress: process.env.MAIL_FROM_ADDRESS,
    fromName: process.env.MAIL_FROM_NAME,
  },
};

module.exports = config;
