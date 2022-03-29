const fp = require('fastify-plugin');
const jwtPlugin = require('fastify-jwt');

const authPlugin = async function (server, opts) {
  server.register(jwtPlugin, {
    secret: opts.secret || server.config.SECRET,
  });

  server.decorate('authenticate', async function (req, res) {
    try {
      await req.jwtVerify();
    } catch (err) {
      res.send(err);
    }
  });
};

module.exports = fp(authPlugin);
