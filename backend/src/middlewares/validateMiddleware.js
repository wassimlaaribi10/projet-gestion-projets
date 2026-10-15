// ============================================
// Middleware de validation
// ============================================

const { validationResult } = require('express-validator');

/**
 * Middleware qui vérifie les résultats de validation.
 * Doit être placé APRÈS les règles de validation et AVANT le controller.
 *
 * Exemple :
 *   router.post('/register', registerValidator, validate, controller);
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err) => ({
      field: err.path,
      message: err.msg,
    }));

    return res.status(400).json({
      success: false,
      message: 'Erreur de validation',
      errors: formattedErrors,
    });
  }

  next();
};

module.exports = validate;
