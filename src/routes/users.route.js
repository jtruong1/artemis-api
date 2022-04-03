const {
  getAllUsersHandler,
  getSingleUserHandler,
} = require('../controllers/users.controller');
const { userSchema, usersSchema } = require('../schemas/users.schema');

async function userRoutes(server, _opts) {
  server.get(
    '/',
    {
      schema: {
        response: {
          200: usersSchema,
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
          200: userSchema,
        },
      },
    },
    getSingleUserHandler
  );
}

module.exports = userRoutes;

module.exports.autoPrefix = '/users';
