const fp = require('fastify-plugin');
const { SimpleIntervalJob, AsyncTask } = require('toad-scheduler');
const prisma = require('../../utils/prisma.util');
const { handleErrorResponse } = require('../../utils/response.util');

async function uptimePlugin(server, _opts) {
  const checks = await prisma.check.findMany({
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
  });

  checks.forEach((check) => {
    const monitor = check.monitor;

    const task = new AsyncTask(
      `check monitor ${monitor.id} uptime`,
      () => {
        let data = {
          checkedAt: new Date(),
        };

        return server.axios
          .get(monitor.url)
          .then((res) => {
            data = {
              status: 'up',
              metadata: {
                status_code: res.status,
                response_time: res.duration,
              },
              ...data,
            };
          })
          .catch((err) => {
            try {
              handleErrorResponse(err);
            } catch (e) {
              data = {
                status: 'down',
                metadata: {
                  error: e.message,
                },
                ...data,
              };
            }
          })
          .then(async () => {
            try {
              await prisma.check.update({
                where: { id: check.id },
                data,
              });

              server.log.info(
                `[uptime] monitor ${monitor.id} is ${data.status}`
              );
            } catch (err) {
              server.log.error(err);
            }
          });
      },
      (err) => {
        server.log.error(err);
      }
    );

    const job = new SimpleIntervalJob(
      { seconds: check.interval, runImmediately: true },
      task
    );

    server.scheduler.addSimpleIntervalJob(job);
  });
}

module.exports = fp(uptimePlugin);
