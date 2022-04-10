import fp from 'fastify-plugin';
import cookie from 'fastify-cookie';
import jwt from 'fastify-jwt';

async function authPlugin(server, _opts) {
  const { config } = server;

  server.register(jwt, {
    secret: config.APP_KEY,
    cookie: {
      cookieName: 'token',
      signed: true,
    },
    sign: {
      expiresIn: '1d',
    },
  });

  server.register(cookie, {
    secret: config.APP_KEY,
  });

  server.decorate('authenticate', async (req, res) => {
    try {
      await req.jwtVerify();
    } catch (err) {
      res.send(err);
    }
  });
}

export default fp(authPlugin, { name: 'auth' });
