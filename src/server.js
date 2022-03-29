const fastify = require('fastify');
const envPlugin = require('fastify-env');
const sensiblePlugin = require('fastify-sensible');
const authPlugin = require('./plugins/auth');
const configSchema = require('./utils/config');
const authRoutes = require('./modules/auth/auth.route');
const userRoutes = require('./modules/users/users.route');

const createServer = () => {
  const server = fastify({
    logger: true,
  });

  server.get('/', async () => {
    return { hello: 'world' };
  });

  server.register(envPlugin, { schema: configSchema, dotenv: true });
  server.register(sensiblePlugin);
  server.register(authPlugin);

  server.register(authRoutes, { prefix: 'api/auth' });
  server.register(userRoutes, { prefix: 'api/users' });

  return server;
};

module.exports = { createServer };
