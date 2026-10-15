// ============================================
// Middleware d'autorisation (RBAC)
// ============================================

/**
 * Middleware qui vérifie si l'utilisateur a le rôle requis.
 * Doit être utilisé APRÈS authenticate.
 *
 * @param {...string} allowedRoles - Les rôles autorisés
 * @returns {Function} Middleware Express
 *
 * Exemple :
 *   router.get('/admin-only', authenticate, authorize('admin'), controller);
 *   router.post('/projects', authenticate, authorize('admin', 'chef_projet'), controller);
 */
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      // 1. Vérifier que req.user existe (authenticate est passé avant)
      if (!req.user) {
        const error = new Error('Authentification requise');
        error.status = 401;
        throw error;
      }

      // 2. Vérifier que le rôle de l'utilisateur est autorisé
      if (!allowedRoles.includes(req.user.role)) {
        const error = new Error(`Accès refusé. Rôles autorisés : ${allowedRoles.join(', ')}`);
        error.status = 403;
        throw error;
      }

      // 3. Rôle autorisé, passer au controller
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = authorize;
