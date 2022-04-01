require('dotenv').config();

const { createServer } = require('./src/server');
const appConfig = require('./src/configs/app.config');

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
