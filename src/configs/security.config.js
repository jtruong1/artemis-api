const securityConfig = {
  jwt: {
    expiresIn: '1d',
  },
  hash: {
    saltRounds: 10,
  },
};

module.exports = securityConfig;
