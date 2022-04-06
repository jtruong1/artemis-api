const S = require('fluent-json-schema');
const { monitorsSchema } = require('./monitors.schema');

const statusPageSchema = S.object()
  .prop('id', S.integer())
  .prop('slug', S.string())
  .prop('label', S.string())
  .prop('monitors', monitorsSchema);

const statusPagesSchema = S.array().items(statusPageSchema);

const createStatusPageSchema = S.object()
  .prop('monitor_ids', S.array().items(S.integer()).required())
  .prop('slug', S.string().required())
  .prop('label', S.string().required());

const updateStatusPageSchema = S.object()
  .prop('monitor_ids', S.array().items(S.integer()))
  .prop('slug', S.string())
  .prop('label', S.string());

module.exports = {
  statusPageSchema,
  statusPagesSchema,
  createStatusPageSchema,
  updateStatusPageSchema,
};
