// ============================================
// Routes Auth
// ============================================

const express = require('express');
const authController = require('../controllers/authController');
const authenticate = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validateMiddleware');
const { registerValidator, loginValidator } = require('../validators/authValidator');

const router = express.Router();

// Routes publiques
router.post('/register', registerValidator, validate, authController.register);
router.post('/login', loginValidator, validate, authController.login);

// Route protégée
router.get('/me', authenticate, authController.getMe);

module.exports = router;
