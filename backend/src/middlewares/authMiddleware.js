// ============================================
// Middleware d'authentification (vérifie le JWT)
// ============================================

const verifyToken = require('../utils/verifyToken');

/**
 * Middleware qui vérifie le JWT dans le header Authorization.
 * Ajoute req.user = { id, role } si le token est valide.
 * Sinon, renvoie une erreur 401.
 */
const authenticate = (req, res, next) => {
  try {
    // 1. Récupérer le header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      const error = new Error('Token manquant');
      error.status = 401;
      throw error;
    }

    // 2. Vérifier le format "Bearer <token>"
    if (!authHeader.startsWith('Bearer ')) {
      const error = new Error('Format de token invalide (attendu : Bearer <token>)');
      error.status = 401;
      throw error;
    }

    // 3. Extraire le token
    const token = authHeader.split(' ')[1];

    // 4. Vérifier le token
    const decoded = verifyToken(token);

    // 5. Ajouter l'utilisateur à la requête
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    // 6. Passer au controller
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
