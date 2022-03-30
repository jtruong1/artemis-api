const path = require('path');
const fastify = require('fastify');
const corsPlugin = require('fastify-cors');
const helmetPlugin = require('fastify-helmet');
const sensiblePlugin = require('fastify-sensible');
const schedulePlugin = require('fastify-schedule');
const routesPlugin = require('fastify-routes');
const autoloadPlugin = require('fastify-autoload');

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
    .register(corsPlugin)
    .register(helmetPlugin)
    .register(sensiblePlugin)
    .register(schedulePlugin)
    .register(routesPlugin);

  server.get('/', async (req, res) => {
    return { hello: 'world' };
  });

  server.register(autoloadPlugin, {
    dir: path.join(__dirname, 'plugins'),
  });

  server.register(autoloadPlugin, {
    dir: path.join(__dirname, 'modules'),
    ignorePattern: /.*(controller|schema|service).js/,
    // indexPattern: /.*route(\.ts|\.js|\.cjs|\.mjs)$/,
    options: { prefix: '/api' },
  });

  return server;
};

module.exports = { createServer };
