const { createServer } = require('./server');
const { log } = require('./utils/logger');

const server = createServer();

const init = async () => {
  try {
    server.ready(async () => {
      await server.listen(process.env.PORT || server.config.PORT);

      log(`server listening on port ${server.config.PORT}`);
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

init();
