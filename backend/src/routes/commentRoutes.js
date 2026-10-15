// ============================================
// Routes Comment
// ============================================

const express = require('express');
const controller = require('../controllers/commentController');

const router = express.Router();

router.post('/', controller.createComment);
router.get('/', controller.getAllComments);
router.get('/:id', controller.getCommentById);
router.put('/:id', controller.updateComment);
router.delete('/:id', controller.deleteComment);

module.exports = router;
