const {
  createMonitorHandler,
  getAllMonitorsHandler,
  getSingleMonitorHandler,
  updateMonitorHandler,
  deleteMonitorHandler,
} = require('../controllers/monitors.controller');
const {
  monitorSchema,
  monitorsSchema,
  createMonitorSchema,
  updateMonitorSchema,
} = require('../schemas/monitors.schema');

async function monitorRoutes(server, _opts) {
  server.post(
    '/',
    {
      schema: {
        body: createMonitorSchema,
        response: {
          201: monitorSchema,
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
          200: monitorsSchema,
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
          200: monitorSchema,
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
          200: monitorSchema,
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
          200: monitorSchema,
        },
      },
      onRequest: [server.authenticate],
    },
    deleteMonitorHandler
  );
}

module.exports = monitorRoutes;

module.exports.autoPrefix = '/monitors';
