const extractDomain = require('extract-domain');
const {
  addSite,
  getAllSites,
  getSingleSite,
  updateSite,
  deleteSite,
} = require('../services/sites.service');

async function addSiteHandler(req, res) {
  const { url } = req.body;

  const parsedUrl = parseUrl(url);

  try {
    const site = await addSite({
      userId: req.user.sub,
      ...parsedUrl,
    });

    res.code(201).send(site);
  } catch (err) {
    throw this.httpErrors.badRequest(err);
  }
}

async function getAllSitesHandler(req, res) {
  return await getAllSites(req.user.sub);
}

async function getSingleSiteHandler(req, res) {
  const { id } = req.params;

  const site = await getSingleSite(id);

  if (!site) {
    throw this.httpErrors.notFound();
  }

  if (site.userId !== req.user.sub) {
    throw this.httpErrors.unauthorized();
  }

  return site;
}

async function updateSiteHandler(req, res) {
  const { id } = req.params;
  const { url } = req.body;

  const site = await getSingleSite(id);

  if (!site) {
    throw this.httpErrors.notFound();
  }

  if (site.userId !== req.user.sub) {
    throw this.httpErrors.unauthorized();
  }

  return await updateSite(id, parseUrl(url));
}

async function deleteSiteHandler(req, res) {
  const { id } = req.params;

  const site = await getSingleSite(id);

  if (!site) {
    throw this.httpErrors.notFound();
  }

  if (site.userId !== req.user.sub) {
    throw this.httpErrors.unauthorized();
  }

  return await deleteSite(id);
}

function parseUrl(url) {
  const q = new URL(url);
  const domain = extractDomain(q.hostname, { tld: true });

  return {
    url: q.href,
    label: domain || q.hostname,
  };
}

module.exports = {
  addSiteHandler,
  getAllSitesHandler,
  getSingleSiteHandler,
  updateSiteHandler,
  deleteSiteHandler,
};
