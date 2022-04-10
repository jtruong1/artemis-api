import { hash, compare } from 'bcrypt';
import securityConfig from '../configs/security.config.js';

const hashPassword = (password) => {
  return hash(password, securityConfig.hash.saltOrRounds);
};

const comparePassword = (password, hashedPassword) => {
  return compare(password, hashedPassword);
};

export { hashPassword, comparePassword };
