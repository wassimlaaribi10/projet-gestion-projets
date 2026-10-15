// ============================================
// Routes Comment
// ============================================

const express = require('express');
const controller = require('../controllers/commentController');
const authenticate = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authenticate);

router.post('/', controller.createComment);
router.get('/', controller.getAllComments);
router.get('/:id', controller.getCommentById);
router.put('/:id', controller.updateComment);
router.delete('/:id', controller.deleteComment);

module.exports = router;
