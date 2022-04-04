const extractDomain = require('extract-domain');
const {
  createMonitor,
  getAllMonitors,
  getSingleMonitor,
  updateMonitor,
  deleteMonitor,
} = require('../services/monitors.service');

async function createMonitorHandler(req, res) {
  const { url } = req.body;

  const parsedUrl = parseUrl(url);

  try {
    const monitor = await createMonitor({
      userId: req.user.id,
      ...parsedUrl,
    });

    res.code(201).send(monitor);
  } catch (err) {
    throw this.httpErrors.badRequest(err);
  }
}

async function getAllMonitorsHandler(req, res) {
  return await getAllMonitors(req.user.id);
}

async function getSingleMonitorHandler(req, res) {
  const { id } = req.params;

  const monitor = await getSingleMonitor(id);

  if (!monitor) {
    throw this.httpErrors.notFound();
  }

  if (monitor.userId !== req.user.id) {
    throw this.httpErrors.unauthorized();
  }

  return monitor;
}

async function updateMonitorHandler(req, res) {
  const { id } = req.params;
  const { url } = req.body;

  const monitor = await getSingleMonitor(id);

  if (!monitor) {
    throw this.httpErrors.notFound();
  }

  if (monitor.userId !== req.user.id) {
    throw this.httpErrors.unauthorized();
  }

  return await updateMonitor(id, parseUrl(url));
}

async function deleteMonitorHandler(req, res) {
  const { id } = req.params;

  const monitor = await getSingleMonitor(id);

  if (!monitor) {
    throw this.httpErrors.notFound();
  }

  if (monitor.userId !== req.user.id) {
    throw this.httpErrors.unauthorized();
  }

  return await deleteMonitor(id);
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
  createMonitorHandler,
  getAllMonitorsHandler,
  getSingleMonitorHandler,
  updateMonitorHandler,
  deleteMonitorHandler,
};
