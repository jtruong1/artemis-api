const fp = require('fastify-plugin');
const { SimpleIntervalJob, AsyncTask } = require('toad-scheduler');
const prisma = require('../../utils/prisma.util');

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
        let report = {};

        return server.axios
          .get(monitor.url)
          .then((res) => {
            report = {
              status: 'up',
              metadata: {
                status_code: res.status,
                response_time: res.duration,
              },
            };
          })
          .catch((err) => {
            report = {
              status: 'down',
              metadata: {
                error: err.message,
              },
            };
          })
          .then(async () => {
            try {
              if (report.status === 'down') {
                const incidents = await prisma.check
                  .findUnique({
                    where: {
                      id: check.id,
                    },
                  })
                  .incidents({
                    where: {
                      resolvedAt: null,
                    },
                    //   orderBy: {
                    //     id: 'desc',
                    //   },
                    //   take: 1,
                  });

                if (incidents.length === 0) {
                  report = {
                    ...report,
                    incidents: {
                      create: {
                        reason: report.metadata.error,
                      },
                    },
                  };
                }
              }

              await prisma.check.update({
                where: {
                  id: check.id,
                },
                data: {
                  ...report,
                  checkedAt: new Date(),
                },
              });

              server.log.info(
                `[uptime] monitor ${monitor.id} is ${report.status}`
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
