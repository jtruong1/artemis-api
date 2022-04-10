import fp from 'fastify-plugin';
import axios from 'axios';
import https from 'https';

async function axiosPlugin(server, _opts) {
  const http = axios.create({
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: '0',
    },
    httpsAgent: new https.Agent({
      maxCachedSessions: 0,
    }),
  });

  http.interceptors.request.use(
    (config) => {
      config.metadata = { startTime: Date.now() };
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  http.interceptors.response.use(
    (res) => {
      res.duration = Date.now() - res.config.metadata.startTime;
      return res;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  server.decorate('axios', http);
}

export default fp(axiosPlugin, { name: 'axios' });
