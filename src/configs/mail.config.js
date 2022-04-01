const env = process.env;

const mailConfig = {
  host: env.MAIL_HOST,
  port: env.MAIL_PORT,
  // secure: true,
  auth: {
    user: env.MAIL_USERNAME,
    pass: env.MAIL_PASSWORD,
  },
  fromAddress: env.MAIL_FROM_ADDRESS,
  fromName: env.MAIL_FROM_NAME,
};

module.exports = mailConfig;
