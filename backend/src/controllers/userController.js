// ============================================
// Controller User : gestion HTTP
// ============================================

const { User } = require('../models');

// PUT /api/users/:id
const updateProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nom, prenom, email } = req.body;

    // Vérifier que l'utilisateur modifie son propre profil
    if (req.user.id !== id) {
      const error = new Error('Vous ne pouvez modifier que votre propre profil');
      error.status = 403;
      throw error;
    }

    const user = await User.findById(id);

    if (!user) {
      const error = new Error('Utilisateur introuvable');
      error.status = 404;
      throw error;
    }

    if (nom) user.nom = nom;
    if (prenom) user.prenom = prenom;
    if (email) user.email = email;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profil mis à jour',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/users/:id/password
const changePassword = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    // Vérifier que l'utilisateur modifie son propre mot de passe
    if (req.user.id !== id) {
      const error = new Error('Vous ne pouvez modifier que votre propre mot de passe');
      error.status = 403;
      throw error;
    }

    const user = await User.findById(id).select('+password');

    if (!user) {
      const error = new Error('Utilisateur introuvable');
      error.status = 404;
      throw error;
    }

    // Vérifier l'ancien mot de passe
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      const error = new Error('Ancien mot de passe incorrect');
      error.status = 400;
      throw error;
    }

    // Mettre à jour (le hash sera fait par le hook pre-save)
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Mot de passe modifié',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateProfile,
  changePassword,
};
