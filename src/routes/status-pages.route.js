import {
  createStatusPageHandler,
  getAllStatusPagesHandler,
  getSingleStatusPageHandler,
  updateStatusPageHandler,
  deleteStatusPageHandler,
} from '../controllers/status-pages.controller.js';
import {
  statusPageSchema,
  statusPagesSchema,
  createStatusPageSchema,
  updateStatusPageSchema,
} from '../schemas/status-pages.schema.js';

export const autoPrefix = '/status-pages';

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

export default statusPageRoutes;
