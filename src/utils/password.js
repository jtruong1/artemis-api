const bcrypt = require('bcrypt');
const config = require('../utils/config');

function hashPassword(str) {
  return bcrypt.hash(str, config.hash.saltRounds);
}

function comparePassword(str, hash) {
  return bcrypt.compare(str, hash);
}

module.exports = { hashPassword, comparePassword };
