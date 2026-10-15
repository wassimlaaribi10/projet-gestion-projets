// ============================================
// Validateurs pour l'authentification
// ============================================

const { body } = require('express-validator');

// ============================================
// Validation : inscription
// ============================================

const registerValidator = [
  body('nom')
    .trim()
    .notEmpty()
    .withMessage('Le nom est obligatoire')
    .isLength({ min: 2, max: 50 })
    .withMessage('Le nom doit contenir entre 2 et 50 caractères'),

  body('prenom')
    .trim()
    .notEmpty()
    .withMessage('Le prénom est obligatoire')
    .isLength({ min: 2, max: 50 })
    .withMessage('Le prénom doit contenir entre 2 et 50 caractères'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage("L'email est obligatoire")
    .isEmail()
    .withMessage('Email invalide')
    .normalizeEmail(),

  body('password')
    .notEmpty()
    .withMessage('Le mot de passe est obligatoire')
    .isLength({ min: 8 })
    .withMessage('Le mot de passe doit contenir au moins 8 caractères')
    .matches(/[A-Za-z]/)
    .withMessage('Le mot de passe doit contenir au moins une lettre')
    .matches(/\d/)
    .withMessage('Le mot de passe doit contenir au moins un chiffre'),
];

// ============================================
// Validation : connexion
// ============================================

const loginValidator = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage("L'email est obligatoire")
    .isEmail()
    .withMessage('Email invalide')
    .normalizeEmail(),

  body('password').notEmpty().withMessage('Le mot de passe est obligatoire'),
];

module.exports = {
  registerValidator,
  loginValidator,
};
