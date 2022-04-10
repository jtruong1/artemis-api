import {
  registerHandler,
  loginHandler,
  getProfileHandler,
} from '../controllers/auth.controller.js';
import {
  registerSchema,
  registerResponseSchema,
  loginSchema,
  loginResponseSchema,
  profileSchema,
} from '../schemas/auth.schema.js';

export const autoPrefix = '/auth';

async function authRoutes(server, _opts) {
  server.post(
    '/register',
    {
      schema: {
        body: registerSchema,
        response: {
          201: registerResponseSchema,
        },
      },
    },
    registerHandler
  );

  server.post(
    '/login',
    {
      schema: {
        body: loginSchema,
        response: {
          200: loginResponseSchema,
        },
      },
    },
    loginHandler
  );

  server.get(
    '/profile',
    {
      schema: {
        response: {
          200: profileSchema,
        },
      },
      onRequest: [server.authenticate],
    },
    getProfileHandler
  );
}

export default authRoutes;
