const S = require('fluent-json-schema');
const { checksSchema } = require('./checks.schema');

const monitorBaseSchema = S.object()
  .additionalProperties(false)
  .prop('url', S.string().format(S.FORMATS.URL).required())
  .prop('label', S.string().format(S.FORMATS.HOSTNAME));

const monitorSchema = S.object()
  .prop('id', S.integer())
  // .prop('createdAt', S.string())
  // .prop('updatedAt', S.string())
  .prop('checks', checksSchema)
  .extend(monitorBaseSchema);

const monitorsSchema = S.array().items(monitorSchema);

const createMonitorSchema = monitorBaseSchema;

const updateMonitorSchema = monitorBaseSchema;

module.exports = {
  monitorSchema,
  monitorsSchema,
  createMonitorSchema,
  updateMonitorSchema,
};
