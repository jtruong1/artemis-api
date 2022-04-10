import fastify from 'fastify';
import autoload from 'fastify-autoload';
import cors from 'fastify-cors';
import env from 'fastify-env';
import helmet from 'fastify-helmet';
import schedule from 'fastify-schedule';
import sensible from 'fastify-sensible';
import S from 'fluent-json-schema';
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

  server.register(env, {
    dotenv: true,
    schema: S.object()
      .prop('APP_NAME', S.string())
      .prop('APP_KEY', S.string().required())
      .prop('APP_PORT', S.integer().default(3000))
      .prop('DATABASE_URL', S.string().required())
      .prop('MAIL_HOST', S.string())
      .prop('MAIL_PORT', S.integer().raw({ nullable: true }))
      .prop('MAIL_USERNAME', S.string())
      .prop('MAIL_PASSWORD', S.string())
      .prop('MAIL_FROM_ADDRESS', S.string().required())
      .prop('MAIL_FROM_NAME', S.string().required())
      .valueOf(),
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
