const fp = require('fastify-plugin');
const jwtPlugin = require('fastify-jwt');
const appConfig = require('../configs/app.config');
const securityConfig = require('../configs/security.config');

async function authPlugin(server, _opts) {
  server.register(jwtPlugin, {
    secret: appConfig.key,
    cookie: {
      cookieName: 'token',
      signed: true,
    },
    sign: {
      expiresIn: securityConfig.jwt.expiresIn,
    },
  });

  server.decorate('authenticate', async (req, res) => {
    try {
      await req.jwtVerify();
    } catch (err) {
      res.send(err);
    }
  });
}

module.exports = fp(authPlugin);
