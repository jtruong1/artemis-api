const env = process.env;

const appConfig = {
  name: env.APP_NAME || 'Artemis',
  key: env.APP_KEY || 'secret',
  port: env.APP_PORT || 3000,
};

module.exports = appConfig;
