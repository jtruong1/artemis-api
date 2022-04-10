import fp from 'fastify-plugin';
import { SimpleIntervalJob, AsyncTask } from 'toad-scheduler';
import { add, isFuture } from 'date-fns';
import prisma from '../../utils/prisma.util.js';
import { parseCertificate } from '../../utils/certificate.util.js';

async function certificatePlugin(server, _opts) {
  const task = new AsyncTask(
    'check monitor certificates',
    () => {
      return prisma.check
        .findMany({
          where: {
            type: 'certificate',
            enabled: true,
          },
          include: {
            monitor: {
              include: {
                user: true,
              },
            },
          },
        })
        .then((checks) => {
          checks.forEach((check) => {
            const nextCheck = add(new Date(check.checkedAt), {
              seconds: check.interval,
            });

            if (isFuture(nextCheck)) {
              return;
            }

            let data = {};

            server.axios
              .get(check.monitor.url)
              .then((res) => {
                const socket = res.request.res.socket;

                const certificate = parseCertificate(
                  socket.getPeerCertificate()
                );

                if (socket.authorized) {
                  data = {
                    status: 'up',
                    metadata: { ...certificate },
                  };
                } else {
                  data = {
                    status: 'down',
                    metadata: { error: 'Failed to validate certificate' },
                  };
                }
              })
              .catch(() => {
                data = { status: 'down' };
              })
              .finally(() => {
                prisma.check
                  .update({
                    where: { id: check.id },
                    data: { ...data, checkedAt: new Date() },
                  })
                  .then(() => {
                    if (data.status === 'down') {
                      server.log.info(
                        `[certificate] monitor ${check.monitor.id} is down`
                      );
                    }
                  })
                  .catch((err) => {
                    server.log.error(err);
                  });
              });
          });
        })
        .catch((err) => {
          server.log.error(err);
        });
    },
    (err) => {
      server.log.error(err);
    }
  );

  const job = new SimpleIntervalJob(
    { seconds: 30, runImmediately: true },
    task
  );

  server.scheduler.addSimpleIntervalJob(job);
}

export default fp(certificatePlugin, { name: 'certificate' });
