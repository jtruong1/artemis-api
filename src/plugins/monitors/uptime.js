const fp = require('fastify-plugin');
const { SimpleIntervalJob, AsyncTask } = require('toad-scheduler');
const prisma = require('../../utils/prisma');

async function uptimePlugin(server, opts) {
  const monitor = await prisma.monitor.findUnique({
    where: {
      slug: 'uptime',
    },
  });

  const sites = await prisma.site.findMany({
    where: {
      monitors: {
        some: {
          enabled: true,
          monitor: {
            id: monitor.id,
          },
        },
      },
    },
  });

  sites.forEach((site) => {
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
              monitor: {
                connect: { id: monitor.id },
              },
              ...report,
              updatedAt: new Date(),
            };

            try {
              const reports = await prisma.report.findMany({
                where: {
                  site: {
                    id: site.id,
                  },
                  monitor: {
                    id: monitor.id,
                  },
                },
              });

              const lastReport = reports[reports.length - 1];

              if (report.success && lastReport && lastReport.success) {
                await prisma.report.update({
                  where: {
                    id: lastReport.id,
                  },
                  data: {
                    checkedAt: new Date(),
                  },
                });
              } else {
                await prisma.site.update({
                  where: {
                    id: site.id,
                  },
                  data: {
                    reports: {
                      create: report,
                    },
                  },
                });
              }

              server.log.info(
                `${site.label} is ${report.success ? 'up' : 'down'}`
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
      { minutes: 1, runImmediately: true },
      task,
      `uptime_${site.id}`
    );

    server.scheduler.addSimpleIntervalJob(job);
  });
}

module.exports = fp(uptimePlugin);
