const bcrypt = require('bcrypt');
const securityConfig = require('../configs/security.config');

function hashPassword(str) {
  return bcrypt.hash(str, securityConfig.hash.saltRounds);
}

function comparePassword(str, hash) {
  return bcrypt.compare(str, hash);
}

module.exports = { hashPassword, comparePassword };
