import S from 'fluent-json-schema';
import { checksSchema } from './checks.schema.js';

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

export {
  monitorSchema,
  monitorsSchema,
  createMonitorSchema,
  updateMonitorSchema,
};
