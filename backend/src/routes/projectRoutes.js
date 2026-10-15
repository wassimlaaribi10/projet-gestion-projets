// ============================================
// Routes Project
// ============================================

const express = require('express');
const controller = require('../controllers/projectController');
const authenticate = require('../middlewares/authMiddleware');

const router = express.Router();

// Toutes les routes de ce router nécessitent un token
router.use(authenticate);

router.post('/', controller.createProject);
router.get('/', controller.getAllProjects);
router.get('/:id', controller.getProjectById);
router.put('/:id', controller.updateProject);
router.patch('/:id/archive', controller.archiveProject);

module.exports = router;
