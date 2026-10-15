// ============================================
// Service Auth : inscription, connexion, profil
// ============================================

const { User } = require('../models');
const generateToken = require('../utils/generateToken');

// ============================================
// Inscription
// ============================================

const register = async ({ nom, prenom, email, password }) => {
  // 1. Vérifier si l'email existe déjà
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error('Cet email est déjà utilisé');
    error.status = 409;
    throw error;
  }

  // 2. Créer l'utilisateur (le password est hashé automatiquement par Mongoose)
  const user = await User.create({
    nom,
    prenom,
    email,
    password,
  });

  // 3. Générer le token
  const token = generateToken(user);

  // 4. Retourner le token + les données utilisateur
  return {
    token,
    user: {
      _id: user._id,
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      role: user.role,
    },
  };
};

// ============================================
// Connexion
// ============================================

const login = async ({ email, password }) => {
  // 1. Chercher l'utilisateur par email (avec le password car select: false)
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    const error = new Error('Email ou mot de passe incorrect');
    error.status = 401;
    throw error;
  }

  // 2. Vérifier que le compte est actif
  if (!user.actif) {
    const error = new Error('Compte désactivé');
    error.status = 403;
    throw error;
  }

  // 3. Comparer le mot de passe
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    const error = new Error('Email ou mot de passe incorrect');
    error.status = 401;
    throw error;
  }

  // 4. Mettre à jour la dernière connexion
  user.derniereConnexion = new Date();
  await user.save();

  // 5. Générer le token
  const token = generateToken(user);

  // 6. Retourner le token + les données utilisateur
  return {
    token,
    user: {
      _id: user._id,
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      role: user.role,
    },
  };
};

// ============================================
// Récupérer le profil de l'utilisateur connecté
// ============================================

const getMe = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    const error = new Error('Utilisateur introuvable');
    error.status = 404;
    throw error;
  }

  return user;
};

module.exports = {
  register,
  login,
  getMe,
};
