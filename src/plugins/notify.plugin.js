const fp = require('fastify-plugin');
const mailConfig = require('../configs/mail.config');

async function notifyPlugin(server, _opts) {
  const notify = (user, message) => {
    server.nodemailer.sendMail(
      {
        from: `${mailConfig.fromName} <${mailConfig.fromAddress}>`,
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

module.exports = fp(notifyPlugin);
