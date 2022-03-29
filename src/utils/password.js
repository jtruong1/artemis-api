const bcrypt = require('bcrypt');

const hash = (str) => {
  return bcrypt.hash(str, 10);
};

const compare = (str, hash) => {
  return bcrypt.compare(str, hash);
};

module.exports = { hash, compare };
