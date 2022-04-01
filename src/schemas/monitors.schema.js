const S = require('fluent-json-schema');

const monitorBaseSchema = S.object()
  .additionalProperties(false)
  .prop('slug', S.string().minLength(3).required())
  .prop('name', S.string().minLength(3));

const monitorSchema = S.object()
  .prop('id', S.integer())
  .prop('createdAt', S.string())
  .prop('updatedAt', S.string())
  .extend(monitorBaseSchema);

const monitorResponseSchema = monitorSchema;

const monitorsResponseSchema = S.array().items(monitorSchema);

module.exports = {
  monitorResponseSchema,
  monitorsResponseSchema,
};
