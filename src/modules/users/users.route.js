const {
  createUserHandler,
  getUsersHandler,
  getUserHandler,
} = require('./users.controller');
const {
  createUserSchema,
  createUserResponseSchema,
  userResponseSchema,
  usersResponseSchema,
} = require('./users.schema');

async function userRoutes(server) {
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

  server.post(
    '/',
    {
      schema: {
        body: createUserSchema,
        response: {
          201: createUserResponseSchema,
        },
      },
    },
    createUserHandler
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
