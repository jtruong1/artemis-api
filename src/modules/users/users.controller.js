const { findUsers, findUserById } = require('./users.service');

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
  getUsersHandler,
  getUserHandler,
};
