const fp = require('fastify-plugin');
const { SimpleIntervalJob, AsyncTask } = require('toad-scheduler');
const { add, isFuture } = require('date-fns');
const prisma = require('../../utils/prisma.util');
const { handleErrorResponse } = require('../../utils/response.util');

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

            let data = {};

            server.axios
              .get(check.monitor.url)
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
              .then(() => {
                prisma.check
                  .update({
                    where: { id: check.id },
                    data: { ...data, checkedAt: new Date() },
                  })
                  .then(() => {
                    server.log.info(
                      `[uptime] monitor ${check.monitor.id} is ${data.status}`
                    );
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

module.exports = fp(uptimePlugin);
