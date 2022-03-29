const bcrypt = require('bcrypt');

const hashPassword = (str) => {
  return bcrypt.hash(str, 10);
};

const comparePassword = (str, hash) => {
  return bcrypt.compare(str, hash);
};

module.exports = { hashPassword, comparePassword };
