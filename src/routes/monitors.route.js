const {
  createMonitorHandler,
  getAllMonitorsHandler,
  getSingleMonitorHandler,
  updateMonitorHandler,
  deleteMonitorHandler,
} = require('../controllers/monitors.controller');
const {
  createMonitorSchema,
  updateMonitorSchema,
  monitorResponseSchema,
  monitorsResponseSchema,
} = require('../schemas/monitors.schema');

async function siteRoutes(server, _opts) {
  server.post(
    '/',
    {
      schema: {
        body: createMonitorSchema,
        response: {
          201: monitorResponseSchema,
        },
      },
      onRequest: [server.authenticate],
    },
    createMonitorHandler
  );

  server.get(
    '/',
    {
      schema: {
        response: {
          200: monitorsResponseSchema,
        },
      },
      onRequest: [server.authenticate],
    },
    getAllMonitorsHandler
  );

  server.get(
    '/:id',
    {
      schema: {
        response: {
          200: monitorResponseSchema,
        },
      },
      onRequest: [server.authenticate],
    },
    getSingleMonitorHandler
  );

  server.put(
    '/:id',
    {
      schema: {
        body: updateMonitorSchema,
        response: {
          200: monitorResponseSchema,
        },
      },
      onRequest: [server.authenticate],
    },
    updateMonitorHandler
  );

  server.delete(
    '/:id',
    {
      schema: {
        response: {
          200: monitorResponseSchema,
        },
      },
      onRequest: [server.authenticate],
    },
    deleteMonitorHandler
  );
}

module.exports = siteRoutes;

module.exports.autoPrefix = '/monitors';
