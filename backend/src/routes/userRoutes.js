// ============================================
// Routes User
// ============================================

const express = require('express');
const controller = require('../controllers/userController');
const authenticate = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authenticate);

router.put('/:id', controller.updateProfile);
router.patch('/:id/password', controller.changePassword);

module.exports = router;
