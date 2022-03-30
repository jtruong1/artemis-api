const {
  addSiteHandler,
  getAllSitesHandler,
  getSingleSiteHandler,
  updateSiteHandler,
  deleteSiteHandler,
} = require('./sites.controller');
const {
  addSiteSchema,
  updateSiteSchema,
  siteResponseSchema,
  sitesResponseSchema,
} = require('./sites.schema');

async function siteRoutes(server, opts) {
  server.post(
    '/',
    {
      schema: {
        body: addSiteSchema,
        response: {
          201: siteResponseSchema,
        },
      },
      onRequest: [server.authenticate],
    },
    addSiteHandler
  );

  server.get(
    '/',
    {
      schema: {
        response: {
          200: sitesResponseSchema,
        },
      },
      onRequest: [server.authenticate],
    },
    getAllSitesHandler
  );

  server.get(
    '/:id',
    {
      schema: {
        response: {
          200: siteResponseSchema,
        },
      },
      onRequest: [server.authenticate],
    },
    getSingleSiteHandler
  );

  server.put(
    '/:id',
    {
      schema: {
        body: updateSiteSchema,
        response: {
          200: siteResponseSchema,
        },
      },
      onRequest: [server.authenticate],
    },
    updateSiteHandler
  );

  server.delete(
    '/:id',
    {
      schema: {
        response: {
          200: siteResponseSchema,
        },
      },
      onRequest: [server.authenticate],
    },
    deleteSiteHandler
  );
}

module.exports = siteRoutes;
