// ============================================
// Rate limiting
// ============================================

const rateLimit = require('express-rate-limit');

// Désactiver le rate limiting en développement ET en test
// (activé uniquement en production)
const isProduction = process.env.NODE_ENV === 'production';

// Limite pour l'authentification (register/login)
const authLimiter = isProduction
  ? rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 10,
      message: {
        success: false,
        message: 'Trop de tentatives. Réessayez dans 15 minutes.',
      },
      standardHeaders: true,
      legacyHeaders: false,
    })
  : (req, res, next) => next();

// Limite globale pour les routes API
const apiLimiter = isProduction
  ? rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      message: {
        success: false,
        message: 'Trop de requêtes. Réessayez plus tard.',
      },
      standardHeaders: true,
      legacyHeaders: false,
    })
  : (req, res, next) => next();

module.exports = {
  authLimiter,
  apiLimiter,
};
