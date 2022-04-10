import S from 'fluent-json-schema';
import { monitorsSchema } from './monitors.schema.js';

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

export {
  statusPageSchema,
  statusPagesSchema,
  createStatusPageSchema,
  updateStatusPageSchema,
};
