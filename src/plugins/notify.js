const fp = require('fastify-plugin');
const config = require('../utils/config');

async function notifyPlugin(server, opts) {
  const notify = (user, message) => {
    server.nodemailer.sendMail(
      {
        from: `${config.mail.fromName} <${config.mail.fromAddress}>`,
        to: user.email,
        subject: 'One of your sites is down!',
        text: message,
      },
      (err, info) => {
        console.log(info);
      }
    );
  };

  server.decorate('notify', notify);
}

module.exports = fp(notifyPlugin);
