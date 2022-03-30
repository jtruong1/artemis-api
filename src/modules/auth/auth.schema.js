const S = require('fluent-json-schema');
const { userBaseSchema, userSchema } = require('../users/users.schema');

const registerSchema = userBaseSchema;
const registerResponseSchema = userSchema;

const loginSchema = userBaseSchema.without('name');
const loginResponseSchema = S.object().prop('accessToken', S.string());

const profileResponseSchema = userSchema;

module.exports = {
  registerSchema,
  registerResponseSchema,
  loginSchema,
  loginResponseSchema,
  profileResponseSchema,
};