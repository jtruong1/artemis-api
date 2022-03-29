const prisma = require('../../utils/prisma');
const { hash } = require('../../utils/password');

async function createUser(data) {
  const { password, ...input } = data;

  const hashedPassword = await hash(password);

  return prisma.user.create({
    data: {
      ...input,
      password: hashedPassword,
    },
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
