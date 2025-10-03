const express = require('express');
const router = express.Router();
const templateController = require('../controllers/templateController');
const { authenticate } = require('../middleware/auth');

router.post('/', authenticate, templateController.createTemplate);
router.get('/', authenticate, templateController.getTemplates);
router.get('/:id', authenticate, templateController.getTemplateById);
router.post('/:id/use', authenticate, templateController.useTemplate);
router.post('/:id/rate', authenticate, templateController.rateTemplate);

module.exports = router;
