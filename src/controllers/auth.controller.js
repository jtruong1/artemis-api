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

    sendToken(user, 201, req, res);
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

  sendToken(user, 200, req, res);
}

async function getProfileHandler(req, res) {
  return req.user;
}

async function sendToken(user, code, req, res) {
  const token = await res.jwtSign({
    id: user.id,
    name: user.name,
    email: user.email,
  });

  res
    .status(code)
    .setCookie('token', token, {
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      sameSite: true,
    })
    .send({ token });
}

module.exports = {
  registerHandler,
  loginHandler,
  getProfileHandler,
};
