const fastify = require('fastify');
const autoload = require('fastify-autoload');
const path = require('path');
const appConfig = require('./configs/app.config');

const createServer = () => {
  const server = fastify({
    logger: {
      prettyPrint:
        process.env.NODE_ENV !== 'production'
          ? {
              translateTime: 'HH:MM:ss Z',
              ignore: 'pid,hostname',
            }
          : false,
    },
  });

  server
    .register(require('fastify-cors'))
    .register(require('fastify-helmet'))
    .register(require('fastify-schedule'))
    .register(require('fastify-sensible'));

  server.get('/', async (req, res) => {
    return { hello: 'world' };
  });

  server.register(autoload, {
    dir: path.join(__dirname, 'plugins'),
  });

  server.register(autoload, {
    dir: path.join(__dirname, 'routes'),
    options: { prefix: '/api' },
  });

  return server;
};

module.exports = { createServer };
