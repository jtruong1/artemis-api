const S = require('fluent-json-schema');
const { userBaseSchema, userSchema } = require('./users.schema');

const registerSchema = userBaseSchema;

const registerResponseSchema = userSchema;

const loginSchema = userBaseSchema.without('name');

const loginResponseSchema = S.object().prop('accessToken', S.string());

const profileResponseSchema = S.object()
  .prop('sub', S.integer())
  .prop('name', S.string());

module.exports = {
  registerSchema,
  registerResponseSchema,
  loginSchema,
  loginResponseSchema,
  profileResponseSchema,
};
