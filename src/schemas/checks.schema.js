import S from 'fluent-json-schema';

const TYPES = {
  UPTIME: 'uptime',
  CERTIFICATE: 'certificate',
};

const STATUSES = {
  PENDING: 'pending',
  UP: 'up',
  DOWN: 'down',
};

const metadataSchema = S.object()
  // Uptime
  .prop('status_code', S.integer())
  .prop('response_time', S.integer())
  .prop('issuer', S.string())
  // Certificate
  .prop('valid_from', S.string())
  .prop('valid_to', S.string())
  // Shared
  .prop('error', S.string());

const checkBaseSchema = S.object()
  .additionalProperties(false)
  .prop('type', S.enum(Object.values(TYPES)).required())
  .prop('label', S.string().required())
  .prop('status', S.enum(Object.values(STATUSES)).default(STATUSES.PENDING))
  .prop('interval', S.integer().required())
  .prop('enabled', S.boolean().default(true))
  .prop('metadata', S.anyOf([metadataSchema, S.null()]));

const checkSchema = S.object()
  .prop('id', S.integer())
  .prop('checkedAt', S.string().raw({ nullable: true }))
  // .prop('createdAt', S.string())
  // .prop('updatedAt', S.string())
  .extend(checkBaseSchema);

const checksSchema = S.array().items(checkSchema);

const createCheckSchema = checkBaseSchema;

const updateCheckSchema = checkBaseSchema;

export { checkSchema, checksSchema, createCheckSchema, updateCheckSchema };
