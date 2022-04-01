const fp = require('fastify-plugin');
const jwtPlugin = require('fastify-jwt');
const appConfig = require('../configs/app.config');

async function authPlugin(server, opts) {
  server.register(jwtPlugin, {
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

module.exports = fp(authPlugin);