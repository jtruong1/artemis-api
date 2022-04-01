const fp = require('fastify-plugin');
const axios = require('axios');

async function axiosPlugin(server, _opts) {
  const instance = axios.create();

  instance.interceptors.request.use(
    (config) => {
      config.metadata = { startTime: Date.now() };
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  instance.interceptors.response.use(
    (res) => {
      res.duration = Date.now() - res.config.metadata.startTime;
      return res;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  server.decorate('axios', instance);
}

module.exports = fp(axiosPlugin);
