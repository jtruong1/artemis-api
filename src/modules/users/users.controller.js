const { getAllUsers, getUserById } = require('./users.service');

async function getAllUsersHandler(_req, _res) {
  return await getAllUsers();
}

async function getSingleUserHandler(req, _res) {
  const { id } = req.params;

  const user = await getUserById(id);

  if (!user) {
    throw this.httpErrors.notFound();
  }

  return user;
}

module.exports = {
  getAllUsersHandler,
  getSingleUserHandler,
};
