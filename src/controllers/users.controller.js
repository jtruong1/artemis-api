const { getAllUsers, getUserById } = require('../services/users.service');

async function getAllUsersHandler(req, res) {
  return await getAllUsers();
}

async function getSingleUserHandler(req, res) {
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
