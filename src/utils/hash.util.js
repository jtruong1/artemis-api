import { hash, compare } from 'bcrypt';

const saltOrRounds = 10;

const hashPassword = (password) => {
  return hash(password, saltOrRounds);
};

const comparePassword = (password, hashedPassword) => {
  return compare(password, hashedPassword);
};

export { hashPassword, comparePassword };
