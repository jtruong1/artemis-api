const S = require('fluent-json-schema');
const { checksSchema } = require('./checks.schema');

const monitorBaseSchema = S.object()
  .prop('url', S.string().format(S.FORMATS.URL).required())
  .prop('label', S.string());

const monitorSchema = S.object()
  .prop('id', S.integer())
  .prop('url', S.string())
  .prop('label', S.string())
  .prop('checks', checksSchema);

const monitorsSchema = S.array().items(monitorSchema);

const createMonitorSchema = monitorBaseSchema;

const updateMonitorSchema = monitorBaseSchema;

module.exports = {
  monitorSchema,
  monitorsSchema,
  createMonitorSchema,
  updateMonitorSchema,
};
