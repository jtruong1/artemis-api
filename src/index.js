const { createServer } = require('./server');

const server = createServer();

const init = async () => {
  try {
    await server.listen(3000);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

init();
