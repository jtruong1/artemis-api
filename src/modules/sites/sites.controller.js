const {
  addSite,
  getAllSites,
  getSingleSite,
  updateSite,
  deleteSite,
} = require('./sites.service');

async function addSiteHandler(req, res) {
  const { url, label } = req.body;

  const parsedUrl = parseUrl(url);

  try {
    const site = await addSite({
      ...parsedUrl,
      label: label || parsedUrl.label,
      userId: req.user.sub,
    });

    return res.code(201).send(site);
  } catch (err) {
    throw this.httpErrors.badRequest(err);
  }
}

async function getAllSitesHandler(req, _res) {
  return await getAllSites(req.user.sub);
}

async function getSingleSiteHandler(req, _res) {
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

async function updateSiteHandler(req, _res) {
  const { id } = req.params;
  const { url, label } = req.body;

  const site = await getSingleSite(id);

  if (!site) {
    throw this.httpErrors.notFound();
  }

  if (site.userId !== req.user.sub) {
    throw this.httpErrors.unauthorized();
  }

  const parsedUrl = parseUrl(url);

  return await updateSite(id, {
    ...parsedUrl,
    label: label || parsedUrl.label,
  });
}

async function deleteSiteHandler(req, _res) {
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

  return {
    url: q.href,
    shortUrl: q.host,
    label: q.hostname,
  };
}

module.exports = {
  addSiteHandler,
  getAllSitesHandler,
  getSingleSiteHandler,
  updateSiteHandler,
  deleteSiteHandler,
};
