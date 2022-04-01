const S = require('fluent-json-schema');
const { monitorsResponseSchema } = require('./monitors.schema');

const siteBaseSchema = S.object()
  .additionalProperties(false)
  .prop('url', S.string().format(S.FORMATS.URL).required())
  .prop('label', S.string().format(S.FORMATS.HOSTNAME));

const siteSchema = S.object()
  .prop('id', S.integer())
  .prop('createdAt', S.string())
  .prop('updatedAt', S.string())
  .prop('monitors', monitorsResponseSchema)
  .extend(siteBaseSchema);

const addSiteSchema = siteBaseSchema;

const updateSiteSchema = siteBaseSchema;

const siteResponseSchema = siteSchema;

const sitesResponseSchema = S.array().items(siteSchema);

module.exports = {
  addSiteSchema,
  updateSiteSchema,
  siteResponseSchema,
  sitesResponseSchema,
};
