const fastify = require('fastify');
const autoloadPlugin = require('fastify-autoload');
const path = require('path');
const appConfig = require('./configs/app.config');

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
    .register(require('fastify-cookie'), {
      secret: appConfig.key,
    })
    .register(require('fastify-cors'))
    .register(require('fastify-helmet'))
    .register(require('fastify-schedule'))
    .register(require('fastify-sensible'));

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
