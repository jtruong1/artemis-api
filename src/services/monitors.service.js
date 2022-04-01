const prisma = require('../utils/prisma.util');

async function createMonitor(data) {
  return prisma.monitor.create({ data });
}

async function getAllMonitors(userId) {
  return prisma.monitor.findMany({
    where: {
      user: {
        id: Number(userId),
      },
    },
  });
}

async function getSingleMonitor(id) {
  return prisma.monitor.findUnique({
    where: {
      id: Number(id),
    },
  });
}

async function updateMonitor(id, data) {
  return prisma.monitor.update({
    where: {
      id: Number(id),
    },
    data,
  });
}

async function deleteMonitor(id) {
  return prisma.monitor.delete({
    where: {
      id: Number(id),
    },
  });
}

module.exports = {
  createMonitor,
  getAllMonitors,
  getSingleMonitor,
  updateMonitor,
  deleteMonitor,
};
