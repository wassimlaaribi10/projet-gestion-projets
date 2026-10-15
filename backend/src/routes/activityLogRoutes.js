// ============================================
// Routes ActivityLog
// ============================================

const express = require('express');
const controller = require('../controllers/activityLogController');

const router = express.Router();

router.get('/', controller.getAllLogs);

module.exports = router;
