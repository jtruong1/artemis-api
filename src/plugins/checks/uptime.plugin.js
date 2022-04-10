import fp from 'fastify-plugin';
import { SimpleIntervalJob, AsyncTask } from 'toad-scheduler';
import { add, isFuture } from 'date-fns';
import prisma from '../../utils/prisma.util.js';
import { handleErrorResponse } from '../../utils/response.util.js';

async function uptimePlugin(server, _opts) {
  const task = new AsyncTask(
    'check monitor uptimes',
    () => {
      return prisma.check
        .findMany({
          where: {
            type: 'uptime',
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

            const monitor = check.monitor;

            let data = {};

            server.axios
              .get(monitor.url)
              .then((res) => {
                data = {
                  status: 'up',
                  metadata: {
                    status_code: res.status,
                    response_time: res.duration,
                  },
                };
              })
              .catch((err) => {
                try {
                  handleErrorResponse(err);
                } catch (e) {
                  data = {
                    status: 'down',
                    metadata: { error: e.message },
                  };
                }
              })
              .finally(() => {
                prisma.check
                  .update({
                    where: { id: check.id },
                    data: { ...data, checkedAt: new Date() },
                  })
                  .then(() => {
                    server.log.info(
                      `[uptime] monitor ${monitor.id} is ${data.status}`
                    );

                    if (data.status === 'down') {
                      server.notify(
                        monitor.user,
                        `Your monitor ${monitor.label} is currently down!`
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

  const job = new SimpleIntervalJob({ seconds: 5, runImmediately: true }, task);

  server.scheduler.addSimpleIntervalJob(job);
}

export default fp(uptimePlugin, { name: 'uptime' });
