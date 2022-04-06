const S = require('fluent-json-schema');
const { userBaseSchema } = require('./users.schema');

const registerSchema = userBaseSchema;

const registerResponseSchema = S.object().prop('token', S.string());

const loginSchema = userBaseSchema.without('name');

const loginResponseSchema = S.object().prop('token', S.string());

const profileSchema = S.object()
  .prop('id', S.integer())
  .prop('name', S.string())
  .prop('email', S.string());

module.exports = {
  registerSchema,
  registerResponseSchema,
  loginSchema,
  loginResponseSchema,
  profileSchema,
};
