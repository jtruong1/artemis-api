const fp = require('fastify-plugin');
const { SimpleIntervalJob, AsyncTask } = require('toad-scheduler');
const prisma = require('../../utils/prisma.util');
const { parseCertificate } = require('../../utils/certificate.util');

async function uptimePlugin(server, _opts) {
  const monitors = await prisma.monitor.findMany({
    where: {
      type: 'uptime',
      NOT: {
        status: 'paused',
      },
    },
    include: {
      user: true,
    },
  });

  monitors.forEach((monitor) => {
    const task = new AsyncTask(
      `monitor ${monitor.id} uptime`,
      () => {
        let report = {};

        return server.axios
          .get(monitor.url)
          .then((res) => {
            report = {
              success: true,
              data: {
                uptime: {
                  duration: res.duration,
                  certificate: parseCertificate(res.request.res),
                },
              },
            };

            // console.log(res.request.res.socket.getPeerCertificate());
          })
          .catch((err) => {
            report = {
              success: false,
              data: {
                uptime: { error: err.message },
              },
            };
          })
          .then(async () => {
            report = {
              ...report,
              updatedAt: new Date(),
            };

            try {
              const reports = await prisma.monitor
                .findUnique({
                  where: {
                    id: Number(monitor.id),
                  },
                })
                .reports({
                  //   orderBy: {
                  //     id: 'desc',
                  //   },
                  //   take: 1,
                });

              const latestReport = reports[reports.length - 1];

              const shouldUpdateReport =
                report.success && latestReport && latestReport.success;

              await prisma.monitor.update({
                where: {
                  id: Number(monitor.id),
                },
                data: {
                  status: report.success ? 'up' : 'down',
                  reports: {
                    upsert: {
                      create: report,
                      update: report,
                      where: {
                        id: shouldUpdateReport
                          ? Number(latestReport.id || 0)
                          : 0,
                      },
                    },
                  },
                },
              });

              server.log.info(
                `Monitor "${monitor.label}" is currently ${
                  report.success ? 'up!' : 'down!'
                }`
              );

              //   if (!report.success) {
              //     server.notify(
              //       monitor.user,
              //       `Monitor "${monitor.label}" is currently down.`
              //     );
              //   }
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
      { seconds: monitor.checkInterval, runImmediately: true },
      task
    );

    server.scheduler.addSimpleIntervalJob(job);
  });
}

module.exports = fp(uptimePlugin);
