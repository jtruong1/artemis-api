const fp = require('fastify-plugin');
const { SimpleIntervalJob, AsyncTask } = require('toad-scheduler');
const prisma = require('../../utils/prisma.util');

async function uptimePlugin(server, _opts) {
  const sites = await prisma.site.findMany({
    where: {
      monitors: {
        some: {
          slug: 'uptime',
          enabled: true,
        },
      },
    },
    include: {
      user: true,
      monitors: true,
    },
  });

  sites.forEach((site) => {
    const monitor = site.monitors.find((monitor) => monitor.slug === 'uptime');

    const task = new AsyncTask(
      `monitor site ${site.id} uptime`,
      () => {
        let report = {};

        return server.axios
          .get(site.url)
          .then((res) => {
            report = {
              success: true,
              data: { duration: res.duration },
            };
          })
          .catch((err) => {
            report = {
              success: false,
              data: { error: err.message },
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
                `Site ${site.id} (${site.label}) is currently ${
                  report.success ? 'up!' : 'down!'
                }`
              );

              //   if (!report.success) {
              //     server.notify(
              //       site.user,
              //       `Your site ${site.label} is currently down.`
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
      { minutes: 1, runImmediately: true },
      task,
      `uptime_${site.id}`
    );

    server.scheduler.addSimpleIntervalJob(job);
  });
}

module.exports = fp(uptimePlugin);
