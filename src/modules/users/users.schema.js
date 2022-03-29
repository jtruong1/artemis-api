const S = require('fluent-json-schema');
const { baseSchema } = require('../../utils/schema');

const userSchema = S.object()
  .additionalProperties(false)
  .prop('email', S.string().format(S.FORMATS.EMAIL).required())
  .prop('name', S.string().required())
  .prop('password', S.string().minLength(6).required());

const createUserSchema = userSchema;

const createUserResponseSchema = S.object()
  .prop('id', S.integer())
  .extend(userSchema.without('password'));

const userResponseSchema = userSchema.without('password').extend(baseSchema);

const usersResponseSchema = S.array().items(userResponseSchema);

module.exports = {
  createUserSchema,
  createUserResponseSchema,
  userResponseSchema,
  usersResponseSchema,
};
