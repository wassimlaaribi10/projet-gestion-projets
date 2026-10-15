// ============================================
// Controller Auth : gestion HTTP
// ============================================

const authService = require('../services/authService');

// ============================================
// POST /api/auth/register
// Inscription
// ============================================

const register = async (req, res, next) => {
  try {
    const { nom, prenom, email, password } = req.body;

    const result = await authService.register({ nom, prenom, email, password });

    res.status(201).json({
      success: true,
      message: 'Inscription réussie',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// ============================================
// POST /api/auth/login
// Connexion
// ============================================

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await authService.login({ email, password });

    res.status(200).json({
      success: true,
      message: 'Connexion réussie',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// ============================================
// GET /api/auth/me
// Profil de l'utilisateur connecté
// ============================================

const getMe = async (req, res, next) => {
  try {
    // req.user est ajouté par le middleware authenticate (Étape 4.6)
    const userId = req.user.id;

    const user = await authService.getMe(userId);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getMe,
};
