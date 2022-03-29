const S = require('fluent-json-schema');

const baseSchema = S.object()
  .prop('id', S.integer())
  .prop('createdAt', S.string())
  .prop('updatedAt', S.string());

module.exports = { baseSchema };
