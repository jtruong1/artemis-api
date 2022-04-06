const prisma = require('../utils/prisma.util');

async function createStatusPage(data) {
  const { monitor_ids, ...input } = data;

  console.log(input);

  return prisma.statusPage.create({
    data: {
      ...input,
      monitors: {
        connect: monitor_ids.map((id) => ({ id: Number(id) })),
      },
    },
    include: {
      monitors: true,
    },
  });
}

async function getAllStatusPages(userId) {
  return prisma.statusPage.findMany({
    where: {
      user: {
        id: Number(userId),
      },
    },
    include: {
      monitors: true,
    },
  });
}

async function getSingleStatusPage(id) {
  return prisma.statusPage.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      monitors: true,
    },
  });
}

async function updateStatusPage(id, data) {
  const { monitor_ids, ...input } = data;

  return prisma.statusPage.update({
    where: {
      id: Number(id),
    },
    include: {
      monitors: true,
    },
    data: {
      ...input,
      monitors: {
        set: [],
        connect: monitor_ids.map((id) => ({ id: Number(id) })),
      },
    },
  });
}

async function deleteStatusPage(id) {
  return prisma.statusPage.delete({
    where: {
      id: Number(id),
    },
    include: {
      monitors: true,
    },
  });
}

module.exports = {
  createStatusPage,
  getAllStatusPages,
  getSingleStatusPage,
  updateStatusPage,
  deleteStatusPage,
};
