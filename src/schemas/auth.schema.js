import S from 'fluent-json-schema';
import { userBaseSchema } from './users.schema.js';

const registerSchema = userBaseSchema;

const registerResponseSchema = S.object().prop('token', S.string());

const loginSchema = userBaseSchema.without('name');

const loginResponseSchema = S.object().prop('token', S.string());

const profileSchema = S.object()
  .prop('id', S.integer())
  .prop('name', S.string())
  .prop('email', S.string());

export {
  registerSchema,
  registerResponseSchema,
  loginSchema,
  loginResponseSchema,
  profileSchema,
};
