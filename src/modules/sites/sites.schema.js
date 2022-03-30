const S = require('fluent-json-schema');

const siteBaseSchema = S.object()
  .additionalProperties(false)
  .prop('url', S.string().format(S.FORMATS.URL).required())
  .prop('shortUrl', S.string().format(S.FORMATS.HOSTNAME))
  .prop('label', S.string().minLength(3));

const siteSchema = S.object()
  .prop('id', S.integer())
  .prop('createdAt', S.string())
  .prop('updatedAt', S.string())
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
