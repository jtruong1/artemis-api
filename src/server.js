const fastify = require('fastify');
const sensiblePlugin = require('fastify-sensible');
const userRoutes = require('./modules/users/users.route');

const createServer = () => {
  const server = fastify({
    logger: true,
  });

  server.register(sensiblePlugin);

  server.get('/', async () => {
    return { hello: 'world' };
  });

  server.register(userRoutes, { prefix: 'api/users' });

  return server;
};

module.exports = { createServer };
