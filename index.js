import 'dotenv/config';
import { createServer } from './src/server.js';
import appConfig from './src/configs/app.config.js';

const init = async () => {
  const server = createServer();

  try {
    await server.listen(process.env.PORT || appConfig.port);

    server.ready(() => {
      console.log(server.printRoutes());
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

init();
