const path = require('path');
const fastify = require('fastify');
const envPlugin = require('fastify-env');
const sensiblePlugin = require('fastify-sensible');
const autoloadPlugin = require('fastify-autoload');
const configSchema = require('./utils/config');

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
    .register(envPlugin, { schema: configSchema, dotenv: true })
    .register(sensiblePlugin);

  server.get('/', async () => {
    return { hello: 'world' };
  });

  server.register(autoloadPlugin, {
    dir: path.join(__dirname, 'plugins'),
  });

  server.register(autoloadPlugin, {
    dir: path.join(__dirname, 'modules'),
    indexPattern: /.*route(\.ts|\.js|\.cjs|\.mjs)$/,
    options: { prefix: '/api' },
  });

  return server;
};

module.exports = { createServer };
