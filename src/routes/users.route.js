const {
  getAllUsersHandler,
  getSingleUserHandler,
} = require('../controllers/users.controller');
const {
  userResponseSchema,
  usersResponseSchema,
} = require('../schemas/users.schema');

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
    getAllUsersHandler
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
    getSingleUserHandler
  );
}

module.exports = userRoutes;

module.exports.autoPrefix = '/users';
