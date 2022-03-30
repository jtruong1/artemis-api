const fp = require('fastify-plugin');
const jwtPlugin = require('fastify-jwt');
const config = require('../utils/config');

async function authPlugin(server, opts) {
  server.register(jwtPlugin, {
    secret: config.key,
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
