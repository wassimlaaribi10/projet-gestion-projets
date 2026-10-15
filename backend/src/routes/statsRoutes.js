// ============================================
// Routes Stats
// ============================================

const express = require('express');
const controller = require('../controllers/statsController');
const authenticate = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authenticate);

router.get('/global', controller.getGlobalStats);
router.get('/projects/:id', controller.getProjectStats);

module.exports = router;
