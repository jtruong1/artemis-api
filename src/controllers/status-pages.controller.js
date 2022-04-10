import {
  createStatusPage,
  getAllStatusPages,
  getSingleStatusPage,
  updateStatusPage,
  deleteStatusPage,
} from '../services/status-pages.service.js';

async function createStatusPageHandler(req, res) {
  const data = req.body;

  try {
    const statusPage = await createStatusPage({
      userId: req.user.id,
      ...data,
    });

    res.code(201).send(statusPage);
  } catch (err) {
    throw this.httpErrors.badRequest(err);
  }
}

async function getAllStatusPagesHandler(req, res) {
  return await getAllStatusPages(req.user.id);
}

async function getSingleStatusPageHandler(req, res) {
  const { id } = req.params;

  const statusPage = await getSingleStatusPage(id);

  if (!statusPage) {
    throw this.httpErrors.notFound();
  }

  if (statusPage.userId !== req.user.id) {
    throw this.httpErrors.unauthorized();
  }

  return statusPage;
}

async function updateStatusPageHandler(req, res) {
  const { id } = req.params;

  const statusPage = await getSingleStatusPage(id);

  if (!statusPage) {
    throw this.httpErrors.notFound();
  }

  if (statusPage.userId !== req.user.id) {
    throw this.httpErrors.unauthorized();
  }

  return await updateStatusPage(id, req.body);
}

async function deleteStatusPageHandler(req, res) {
  const { id } = req.params;

  const statusPage = await getSingleStatusPage(id);

  if (!statusPage) {
    throw this.httpErrors.notFound();
  }

  if (statusPage.userId !== req.user.id) {
    throw this.httpErrors.unauthorized();
  }

  return await deleteStatusPage(id);
}

export {
  createStatusPageHandler,
  getAllStatusPagesHandler,
  getSingleStatusPageHandler,
  updateStatusPageHandler,
  deleteStatusPageHandler,
};
