const bcrypt = require('bcrypt');
const securityConfig = require('../configs/security.config');

const hashPassword = (str) => {
  return bcrypt.hash(str, securityConfig.hash.saltRounds);
};

const comparePassword = (str, hash) => {
  return bcrypt.compare(str, hash);
};

module.exports = { hashPassword, comparePassword };
