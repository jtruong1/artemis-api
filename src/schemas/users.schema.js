import S from 'fluent-json-schema';

const userSchema = S.object()
  .prop('id', S.integer())
  .prop('email', S.string().format(S.FORMATS.EMAIL).required())
  .prop('name', S.string().minLength(2).required())
  .prop('password', S.string().minLength(6).required())
  .prop('createdAt', S.string())
  .prop('updatedAt', S.string());

const userResponseSchema = userSchema.without(['password']);

const usersResponseSchema = S.array().items(userResponseSchema);

export { userSchema, userResponseSchema, usersResponseSchema };
