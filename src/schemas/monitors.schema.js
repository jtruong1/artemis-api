const S = require('fluent-json-schema');

const monitorBaseSchema = S.object()
  .additionalProperties(false)
  .prop('url', S.string().format(S.FORMATS.URL).required())
  .prop('label', S.string().format(S.FORMATS.HOSTNAME));

const monitorSchema = S.object()
  .prop('id', S.integer())
  .prop('createdAt', S.string())
  .prop('updatedAt', S.string())
  .extend(monitorBaseSchema);

const createMonitorSchema = monitorBaseSchema;

const updateMonitorSchema = monitorBaseSchema;

const monitorResponseSchema = monitorSchema;

const monitorsResponseSchema = S.array().items(monitorSchema);

module.exports = {
  createMonitorSchema,
  updateMonitorSchema,
  monitorResponseSchema,
  monitorsResponseSchema,
};
