import fp from 'fastify-plugin';
import cookie from 'fastify-cookie';
import jwt from 'fastify-jwt';
import appConfig from '../configs/app.config.js';
import securityConfig from '../configs/security.config.js';

async function authPlugin(server, _opts) {
  server.register(jwt, {
    secret: appConfig.key,
    cookie: {
      cookieName: 'token',
      signed: true,
    },
    sign: {
      expiresIn: securityConfig.jwt.expiresIn,
    },
  });

  server.register(cookie, {
    secret: appConfig.key,
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
