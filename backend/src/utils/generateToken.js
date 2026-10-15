// ============================================
// Utilitaire : générer un JWT
// ============================================

const jwt = require('jsonwebtoken');

/**
 * Génère un JWT pour un utilisateur.
 * @param {Object} user - Utilisateur (doit contenir _id et role)
 * @returns {string} Token JWT
 */
const generateToken = (user) => {
  const payload = {
    id: user._id,
    role: user.role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

  return token;
};

module.exports = generateToken;
