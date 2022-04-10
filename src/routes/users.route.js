import {
  getAllUsersHandler,
  getSingleUserHandler,
} from '../controllers/users.controller.js';
import {
  userResponseSchema,
  usersResponseSchema,
} from '../schemas/users.schema.js';

export const autoPrefix = '/users';

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

export default userRoutes;
