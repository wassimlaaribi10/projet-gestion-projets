// ============================================
// Routes Project
// ============================================

const express = require('express');
const controller = require('../controllers/projectController');

const router = express.Router();

router.post('/', controller.createProject);
router.get('/', controller.getAllProjects);
router.get('/:id', controller.getProjectById);
router.put('/:id', controller.updateProject);
router.patch('/:id/archive', controller.archiveProject);

module.exports = router;
