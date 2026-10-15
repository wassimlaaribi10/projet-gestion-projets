// ============================================
// Routes Notification
// ============================================

const express = require('express');
const controller = require('../controllers/notificationController');

const router = express.Router();

router.post('/', controller.createNotification);
router.get('/', controller.getAllNotifications);
router.patch('/read-all', controller.markAllAsRead);
router.patch('/:id/read', controller.markAsRead);
router.delete('/:id', controller.deleteNotification);

module.exports = router;
