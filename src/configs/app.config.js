export default {
  name: process.env.APP_NAME || 'Artemis',
  key: process.env.APP_KEY || 'secret',
  port: process.env.APP_PORT || 8080,
};
