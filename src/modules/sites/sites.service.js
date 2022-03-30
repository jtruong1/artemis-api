const prisma = require('../../utils/prisma');

async function addSite(data) {
  return prisma.site.create({ data });
}

async function getAllSites(userId) {
  return prisma.site.findMany({
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

async function getSingleSite(id) {
  return prisma.site.findUnique({
    where: {
      id: Number(id),
    },
  });
}

async function updateSite(id, data) {
  return prisma.site.update({
    where: {
      id: Number(id),
    },
    data,
  });
}

async function deleteSite(id) {
  return prisma.site.delete({
    where: {
      id: Number(id),
    },
  });
}

module.exports = {
  addSite,
  getAllSites,
  getSingleSite,
  updateSite,
  deleteSite,
};
