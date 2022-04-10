import fastify from 'fastify';
import autoload from 'fastify-autoload';
import cors from 'fastify-cors';
import helmet from 'fastify-helmet';
import schedule from 'fastify-schedule';
import sensible from 'fastify-sensible';
import { join } from 'desm';

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

  server.register(cors);
  server.register(helmet);
  server.register(schedule);
  server.register(sensible);

  server.get('/', async (req, res) => {
    return { hello: 'world' };
  });

  server.register(autoload, {
    dir: join(import.meta.url, 'plugins'),
  });

  server.register(autoload, {
    dir: join(import.meta.url, 'routes'),
    options: { prefix: '/api' },
  });

  return server;
};

export { createServer };
