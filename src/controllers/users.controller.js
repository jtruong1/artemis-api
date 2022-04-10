import { getAllUsers, getUserById } from '../services/users.service.js';

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

export { getAllUsersHandler, getSingleUserHandler };
