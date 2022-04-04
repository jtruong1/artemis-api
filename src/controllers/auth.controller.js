const { createUser, getUserByEmail } = require('../services/users.service');
const { hashPassword, comparePassword } = require('../utils/hash.util');

async function registerHandler(req, res) {
  const { password, ...input } = req.body;

  const hashedPassword = await hashPassword(password);

  try {
    const user = await createUser({
      ...input,
      password: hashedPassword,
    });

    res.code(201).send(user);
  } catch (err) {
    throw this.httpErrors.badRequest(err);
  }
}

async function loginHandler(req, res) {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);

  if (!user) {
    throw this.httpErrors.unauthorized(
      'These credentials do not match our records.'
    );
  }

  const isValid = await comparePassword(password, user.password);

  if (!isValid) {
    throw this.httpErrors.unauthorized(
      'These credentials do not match our records.'
    );
  }

  const token = await res.jwtSign({
    sub: user.id,
    name: user.name,
  });

  res.setCookie('token', token, {
    httpOnly: true,
  });

  return { token };
}

async function getProfileHandler(req, res) {
  return req.user;
}

module.exports = {
  registerHandler,
  loginHandler,
  getProfileHandler,
};
