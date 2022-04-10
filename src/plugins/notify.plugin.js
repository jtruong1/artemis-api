import fp from 'fastify-plugin';

async function notifyPlugin(server, _opts) {
  const { config } = server;

  const notify = (user, message) => {
    server.nodemailer.sendMail(
      {
        from: `${config.MAIL_FROM_NAME} <${config.MAIL_FROM_ADDRESS}>`,
        to: user.email,
        subject: 'One of your sites is down!',
        text: message,
      },
      (err, info) => {
        if (err) {
          console.log(err);
        }
      }
    );
  };

  server.decorate('notify', notify);
}

export default fp(notifyPlugin, { name: 'notify' });
