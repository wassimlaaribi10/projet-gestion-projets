// ============================================
// Rate limiting
// ============================================

const rateLimit = require('express-rate-limit');

// En développement : pas de limite
// En production : limites strictes
const isDevelopment = process.env.NODE_ENV === 'development';

// Limite pour l'authentification (register/login)
const authLimiter = isDevelopment
  ? (req, res, next) => next() // pas de limite en dev
  : rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 10,
      message: {
        success: false,
        message: 'Trop de tentatives. Réessayez dans 15 minutes.',
      },
      standardHeaders: true,
      legacyHeaders: false,
    });

// Limite globale pour les routes API
const apiLimiter = isDevelopment
  ? (req, res, next) => next() // pas de limite en dev
  : rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      message: {
        success: false,
        message: 'Trop de requêtes. Réessayez plus tard.',
      },
      standardHeaders: true,
      legacyHeaders: false,
    });

module.exports = {
  authLimiter,
  apiLimiter,
};
