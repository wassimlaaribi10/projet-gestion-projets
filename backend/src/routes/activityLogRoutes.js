// ============================================
// Routes ActivityLog
// ============================================

const express = require('express');
const controller = require('../controllers/activityLogController');
const authenticate = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authenticate);

router.get('/', controller.getAllLogs);

module.exports = router;
