const { getUsersHandler, getUserHandler } = require('./users.controller');
const { userResponseSchema, usersResponseSchema } = require('./users.schema');

async function userRoutes(server, _opts) {
  server.get(
    '/',
    {
      schema: {
        response: {
          200: usersResponseSchema,
        },
      },
    },
    getUsersHandler
  );

  server.get(
    '/:id',
    {
      schema: {
        response: {
          200: userResponseSchema,
        },
      },
    },
    getUserHandler
  );
}

module.exports = userRoutes;
