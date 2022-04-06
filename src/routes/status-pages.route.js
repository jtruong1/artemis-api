const {
  createStatusPageHandler,
  getAllStatusPagesHandler,
  getSingleStatusPageHandler,
  updateStatusPageHandler,
  deleteStatusPageHandler,
} = require('../controllers/status-pages.controller');
const {
  statusPageSchema,
  statusPagesSchema,
  createStatusPageSchema,
  updateStatusPageSchema,
} = require('../schemas/status-pages.schema');

async function statusPageRoutes(server, _opts) {
  server.post(
    '/',
    {
      schema: {
        body: createStatusPageSchema,
        response: {
          201: statusPageSchema,
        },
      },
      onRequest: [server.authenticate],
    },
    createStatusPageHandler
  );

  server.get(
    '/',
    {
      schema: {
        response: {
          200: statusPagesSchema,
        },
      },
      onRequest: [server.authenticate],
    },
    getAllStatusPagesHandler
  );

  server.get(
    '/:id',
    {
      schema: {
        response: {
          200: statusPageSchema,
        },
      },
      onRequest: [server.authenticate],
    },
    getSingleStatusPageHandler
  );

  server.put(
    '/:id',
    {
      schema: {
        body: updateStatusPageSchema,
        response: {
          200: statusPageSchema,
        },
      },
      onRequest: [server.authenticate],
    },
    updateStatusPageHandler
  );

  server.delete(
    '/:id',
    {
      schema: {
        response: {
          200: statusPageSchema,
        },
      },
      onRequest: [server.authenticate],
    },
    deleteStatusPageHandler
  );
}

module.exports = statusPageRoutes;

module.exports.autoPrefix = '/status-pages';
