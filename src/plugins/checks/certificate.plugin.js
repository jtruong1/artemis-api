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
        let data = {
          checkedAt: new Date(),
        };

        return server.axios
          .get(monitor.url)
          .then((res) => {
            const socket = res.request.res.socket;
            const certificate = parseCertificate(socket.getPeerCertificate());

            if (socket.authorized) {
              data = {
                status: 'up',
                metadata: {
                  ...certificate,
                },
                ...data,
              };
            } else {
              data = {
                status: 'down',
                metadata: {
                  error: 'Failed to validate certificate',
                },
                ...data,
              };
            }
          })
          .catch(() => {
            data = {
              status: 'down',
              ...data,
            };
          })
          .then(async () => {
            try {
              await prisma.check.update({
                where: { id: check.id },
                data,
              });

              server.log.info(
                `[certificate] monitor ${monitor.id} is ${data.status}`
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
