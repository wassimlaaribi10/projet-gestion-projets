// ============================================
// Routes Auth
// ============================================

const express = require('express');
const authController = require('../controllers/authController');
const validate = require('../middlewares/validateMiddleware');
const { registerValidator, loginValidator } = require('../validators/authValidator');

const router = express.Router();

// POST /api/auth/register
router.post('/register', registerValidator, validate, authController.register);

// POST /api/auth/login
router.post('/login', loginValidator, validate, authController.login);

// GET /api/auth/me
router.get('/me', authController.getMe);

module.exports = router;
