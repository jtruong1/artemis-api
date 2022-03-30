const { createServer } = require('./server');

const server = createServer();

const init = async () => {
  try {
    server.ready(async () => {
      await server.listen(process.env.PORT || server.config.PORT);
      // console.log(server.routes);
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

init();
