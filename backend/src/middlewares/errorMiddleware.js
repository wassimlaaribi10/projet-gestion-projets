// ============================================
// Middleware de gestion des erreurs
// ============================================
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  // 1. Erreur de validation Mongoose
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));

    return res.status(400).json({
      success: false,
      message: 'Erreur de validation',
      errors,
    });
  }

  // 2. Erreur de duplication (email déjà utilisé, etc.)
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(409).json({
      success: false,
      message: `La valeur du champ '${field}' est déjà utilisée`,
      errors: [],
    });
  }

  // 3. ObjectId invalide
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: `Identifiant invalide : ${err.value}`,
      errors: [],
    });
  }

  // 4. Erreur par défaut
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Erreur serveur',
    errors: [],
  });
};

module.exports = errorHandler;
