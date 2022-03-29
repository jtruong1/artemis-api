const fastify = require('fastify');
const envPlugin = require('fastify-env');
const sensiblePlugin = require('fastify-sensible');
const configSchema = require('./utils/config');
const userRoutes = require('./modules/users/users.route');

const createServer = () => {
  const server = fastify({
    logger: true,
  });

  server.register(envPlugin, { schema: configSchema, dotenv: true });
  server.register(sensiblePlugin);

  server.get('/', async () => {
    return { hello: 'world' };
  });

  server.register(userRoutes, { prefix: 'api/users' });

  return server;
};

module.exports = { createServer };
