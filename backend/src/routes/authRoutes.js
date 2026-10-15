// ============================================
// Routes Auth
// ============================================

const express = require('express');
const authController = require('../controllers/authController');
const authenticate = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validateMiddleware');
const { authLimiter } = require('../middlewares/rateLimiter');
const { registerValidator, loginValidator } = require('../validators/authValidator');

const router = express.Router();

// Routes publiques (avec rate limiting)
router.post('/register', authLimiter, registerValidator, validate, authController.register);

router.post('/login', authLimiter, loginValidator, validate, authController.login);

// Route protégée
router.get('/me', authenticate, authController.getMe);

module.exports = router;
