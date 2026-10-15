// ============================================
// Middleware 404 : route introuvable
// ============================================

const notFound = (req, res, next) => {
  // Ignorer la requête favicon (bruit inutile)
  if (req.originalUrl === '/favicon.ico') {
    return res.status(204).end();
  }

  const error = new Error(`Route introuvable : ${req.method} ${req.originalUrl}`);
  error.status = 404;

  next(error);
};

module.exports = notFound;
