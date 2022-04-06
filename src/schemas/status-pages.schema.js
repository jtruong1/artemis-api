const S = require('fluent-json-schema');
const { monitorsSchema } = require('./monitors.schema');

const statusPageBaseSchema = S.object()
  .prop('monitor_ids', S.array().items(S.integer()).required())
  .prop('slug', S.string());

const statusPageSchema = S.object()
  .prop('id', S.integer())
  .prop('slug', S.string())
  .prop('monitors', monitorsSchema);

const statusPagesSchema = S.array().items(statusPageSchema);

const createStatusPageSchema = statusPageBaseSchema;

const updateStatusPageSchema = statusPageBaseSchema;

module.exports = {
  statusPageSchema,
  statusPagesSchema,
  createStatusPageSchema,
  updateStatusPageSchema,
};
