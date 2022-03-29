const S = require('fluent-json-schema');

const configSchema = S.object().prop(
  'PORT',
  S.integer().default(3000).required()
);

module.exports = configSchema;
