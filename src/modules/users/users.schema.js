const S = require('fluent-json-schema');

const userBaseSchema = S.object()
  .additionalProperties(false)
  .prop('email', S.string().format(S.FORMATS.EMAIL).required())
  .prop('name', S.string().minLength(2).required())
  .prop('password', S.string().minLength(6).required());

const userSchema = S.object()
  .prop('id', S.integer())
  .prop('createdAt', S.string())
  .prop('updatedAt', S.string())
  .extend(userBaseSchema.without('password'));

module.exports = {
  createUserSchema: userBaseSchema,
  createUserResponseSchema: userSchema,
  userResponseSchema: userSchema,
  usersResponseSchema: S.array().items(userSchema),
};
