import prisma from '../utils/prisma.util.js';

async function createMonitor(data) {
  return prisma.monitor.create({
    data: {
      ...data,
      checks: {
        create: [
          {
            type: 'uptime',
            label: 'Uptime',
            interval: 60,
          },
          {
            type: 'certificate',
            label: 'Certificate',
            interval: 300,
          },
        ],
      },
    },
    include: {
      checks: true,
    },
  });
}

async function getAllMonitors(userId) {
  return prisma.monitor.findMany({
    where: {
      user: {
        id: Number(userId),
      },
    },
    include: {
      checks: true,
    },
  });
}

async function getSingleMonitor(id) {
  return prisma.monitor.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      checks: true,
    },
  });
}

async function updateMonitor(id, data) {
  return prisma.monitor.update({
    where: {
      id: Number(id),
    },
    include: {
      checks: true,
    },
    data,
  });
}

async function deleteMonitor(id) {
  return prisma.monitor.delete({
    where: {
      id: Number(id),
    },
    include: {
      checks: true,
    },
  });
}

export {
  createMonitor,
  getAllMonitors,
  getSingleMonitor,
  updateMonitor,
  deleteMonitor,
};
