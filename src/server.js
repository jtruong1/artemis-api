const fastify = require('fastify');

const buildServer = () => {
  const server = fastify({
    logger: true,
  });

  server.get('/', async (req, res) => {
    return { hello: 'world' };
  });

  return server;
};

module.exports = buildServer;
