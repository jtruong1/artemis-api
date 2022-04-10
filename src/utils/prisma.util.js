import Prisma from '@prisma/client';

const prisma = new Prisma.PrismaClient();

// Create an incident whenever a check fails.
prisma.$use(async (params, next) => {
  if (params.model === 'Check' && params.action === 'update') {
    const { where, data } = params.args;

    if (data.status === 'down' && data.metadata && data.metadata.error) {
      const matchingIncidents = await prisma.check
        .findUnique({ where })
        .incidents({
          where: {
            reason: data.metadata.error,
            resolvedAt: null,
          },
        });

      if (matchingIncidents.length === 0) {
        params.args.data = {
          ...data,
          incidents: {
            create: { reason: data.metadata.error },
          },
        };
      }
    }
  }

  return await next(params);
});

export default prisma;
