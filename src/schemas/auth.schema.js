const S = require('fluent-json-schema');
const { userBaseSchema, userSchema } = require('./users.schema');

const registerSchema = userBaseSchema;

const registerResponseSchema = userSchema;

const loginSchema = userBaseSchema.without('name');

const loginResponseSchema = S.object().prop('token', S.string());

const profileSchema = S.object()
  .prop('id', S.integer())
  .prop('name', S.string())
  .prop('email', S.string().format(S.FORMATS.EMAIL));

module.exports = {
  registerSchema,
  registerResponseSchema,
  loginSchema,
  loginResponseSchema,
  profileSchema,
};
