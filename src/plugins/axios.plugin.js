const fp = require('fastify-plugin');
const axios = require('axios');
const https = require('https');

async function axiosPlugin(server, _opts) {
  const instance = axios.create({
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: '0',
    },
    httpsAgent: new https.Agent({
      maxCachedSessions: 0,
    }),
  });

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
