const {
  registerHandler,
  loginHandler,
  getProfileHandler,
} = require('./auth.controller');
const {
  registerSchema,
  registerResponseSchema,
  loginSchema,
  loginResponseSchema,
  profileResponseSchema,
} = require('./auth.schema');

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
          200: profileResponseSchema,
        },
      },
      onRequest: [server.authenticate],
    },
    getProfileHandler
  );
}

module.exports = authRoutes;
