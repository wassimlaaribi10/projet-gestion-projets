// ============================================
// Routes Auth
// ============================================

const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// POST /api/auth/register - Inscription
router.post('/register', authController.register);

// POST /api/auth/login - Connexion
router.post('/login', authController.login);

// GET /api/auth/me - Profil de l'utilisateur connecté
router.get('/me', authController.getMe);

module.exports = router;
