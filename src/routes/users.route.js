import {
  getAllUsersHandler,
  getSingleUserHandler,
} from '../controllers/users.controller.js';
import { userSchema, usersSchema } from '../schemas/users.schema.js';

export const autoPrefix = '/users';

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

export default userRoutes;
