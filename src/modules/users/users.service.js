const prisma = require('../../utils/prisma');

async function createUser(data) {
  return prisma.user.create({
    data,
  });
}

async function getAllUsers() {
  return prisma.user.findMany();
}

async function getUserById(id) {
  return prisma.user.findUnique({
    where: { id: Number(id) },
  });
}

async function getUserByEmail(email) {
  return prisma.user.findUnique({
    where: { email },
  });
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
};
