const bcrypt = require('bcrypt');

const hash = (password) => {
  return bcrypt.hash(password, 10);
};

const compare = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

module.exports = { hash, compare };
