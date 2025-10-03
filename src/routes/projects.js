const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { authenticate } = require('../middleware/auth');

router.post('/', authenticate, projectController.createProject);
router.get('/', authenticate, projectController.getProjects);
router.get('/:id', authenticate, projectController.getProjectById);
router.put('/:id', authenticate, projectController.updateProject);
router.post('/:id/collaborators', authenticate, projectController.addCollaborator);
router.post('/:id/tasks', authenticate, projectController.addTask);
router.post('/:id/versions', authenticate, projectController.createVersion);

module.exports = router;
