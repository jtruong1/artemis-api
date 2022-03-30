const { createServer } = require('./server');
const config = require('./utils/config');

const server = createServer();

const init = async () => {
  try {
    await server.listen(process.env.PORT || config.port);

    console.log(server.routes);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

init();
