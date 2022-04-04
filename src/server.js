const fastify = require('fastify');
const autoloadPlugin = require('fastify-autoload');
const path = require('path');

const createServer = () => {
  const server = fastify({
    logger: {
      prettyPrint: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  });

  server
    .register(require('fastify-cors'))
    .register(require('fastify-helmet'))
    .register(require('fastify-cookie'))
    .register(require('fastify-sensible'))
    .register(require('fastify-schedule'));

  server.get('/', async (req, res) => {
    return { hello: 'world' };
  });

  server.register(autoloadPlugin, {
    dir: path.join(__dirname, 'plugins'),
  });

  server.register(autoloadPlugin, {
    dir: path.join(__dirname, 'routes'),
    options: { prefix: '/api' },
  });

  return server;
};

module.exports = { createServer };
