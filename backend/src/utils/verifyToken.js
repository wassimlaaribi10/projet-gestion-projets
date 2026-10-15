// ============================================
// Utilitaire : vérifier un JWT
// ============================================

const jwt = require('jsonwebtoken');

/**
 * Vérifie un JWT et retourne son payload.
 * @param {string} token - Le token à vérifier
 * @returns {Object} Payload décodé ({ id, role, iat, exp })
 * @throws {Error} Si le token est invalide ou expiré
 */
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      const err = new Error('Token expiré');
      err.status = 401;
      throw err;
    }

    if (error.name === 'JsonWebTokenError') {
      const err = new Error('Token invalide');
      err.status = 401;
      throw err;
    }

    throw error;
  }
};

module.exports = verifyToken;
