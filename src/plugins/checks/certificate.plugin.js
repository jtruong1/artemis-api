const fp = require('fastify-plugin');
const { SimpleIntervalJob, AsyncTask } = require('toad-scheduler');
const prisma = require('../../utils/prisma.util');
const { parseCertificate } = require('../../utils/certificate.util');

async function certificatePlugin(server, _opts) {
  const checks = await prisma.check.findMany({
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
  });

  checks.forEach((check) => {
    const monitor = check.monitor;

    const task = new AsyncTask(
      `check monitor ${monitor.id} certificate`,
      () => {
        let report = {};

        return server.axios
          .get(monitor.url)
          .then((res) => {
            const socket = res.request.res.socket;
            const certificate = parseCertificate(socket.getPeerCertificate());

            if (socket.authorized) {
              report = {
                status: 'up',
                metadata: {
                  ...certificate,
                },
              };
            } else {
              report = {
                status: 'down',
                metadata: {
                  error: 'Failed to verify certificate.',
                },
              };
            }
          })
          .catch((err) => {
            report = {
              status: 'down',
              metadata: {
                error: 'Failed to fetch certificate.',
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
                `[certificate] monitor ${monitor.id} is ${report.status}`
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

module.exports = fp(certificatePlugin);
