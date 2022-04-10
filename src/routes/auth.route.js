import {
  registerHandler,
  loginHandler,
  getProfileHandler,
} from '../controllers/auth.controller.js';
import {
  registerBodySchema,
  loginBodySchema,
  tokenResponseSchema,
  profileResponseSchema,
} from '../schemas/auth.schema.js';

export const autoPrefix = '/auth';

async function authRoutes(server, _opts) {
  server.post(
    '/register',
    {
      schema: {
        body: registerBodySchema,
        response: {
          201: tokenResponseSchema,
        },
      },
    },
    registerHandler
  );

  server.post(
    '/login',
    {
      schema: {
        body: loginBodySchema,
        response: {
          200: tokenResponseSchema,
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
          200: profileResponseSchema,
        },
      },
      onRequest: [server.authenticate],
    },
    getProfileHandler
  );
}

export default authRoutes;
