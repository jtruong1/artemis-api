const prisma = require('../../utils/prisma');

async function createUser(data) {
  return prisma.user.create({
    data,
  });
}

async function findUsers() {
  return prisma.user.findMany();
}

async function findUserById(id) {
  return prisma.user.findUnique({
    where: { id: Number(id) },
  });
}

async function findUserByEmail(email) {
  return prisma.user.findUnique({
    where: { email },
  });
}

module.exports = {
  createUser,
  findUsers,
  findUserById,
  findUserByEmail,
};
