const S = require('fluent-json-schema');

const configSchema = S.object()
  .prop('PORT', S.integer().default(3000).required())
  .prop('SECRET', S.string().default('secret').required());

module.exports = configSchema;
