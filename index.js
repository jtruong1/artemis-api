import { createServer } from './src/server.js';

const init = async () => {
  const server = createServer();

  server.ready(async () => {
    const port = process.env.PORT || server.config.APP_PORT;

    try {
      await server.listen(port);
      console.log(server.printRoutes());
    } catch (err) {
      server.log.error(err);
      process.exit(1);
    }
  });
};

init();
