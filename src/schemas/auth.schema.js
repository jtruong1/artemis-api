import S from 'fluent-json-schema';
import { userSchema } from './users.schema.js';

const registerBodySchema = userSchema.only(['email', 'name', 'password']);

const loginBodySchema = userSchema.only(['email', 'password']);

const tokenResponseSchema = S.object().prop('token', S.string());

const profileResponseSchema = S.object()
  .prop('id', S.integer())
  .prop('name', S.string())
  .prop('email', S.string());

export {
  registerBodySchema,
  loginBodySchema,
  tokenResponseSchema,
  profileResponseSchema,
};
