const { createUser, findUsers, findUserById } = require('./users.service');

async function createUserHandler(req, res) {
  const body = req.body;

  try {
    const user = await createUser(body);

    return res.code(201).send(user);
  } catch (err) {
    throw this.httpErrors.badRequest(err);
  }
}

async function getUsersHandler(_req, _res) {
  return await findUsers();
}

async function getUserHandler(req, _res) {
  const { id } = req.params;

  const user = await findUserById(id);

  if (!user) {
    throw this.httpErrors.notFound();
  }

  return user;
}

module.exports = {
  createUserHandler,
  getUsersHandler,
  getUserHandler,
};
