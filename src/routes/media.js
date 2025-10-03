const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaController');
const { authenticate } = require('../middleware/auth');

router.post('/', authenticate, mediaController.createMedia);
router.get('/', authenticate, mediaController.getMedia);
router.get('/:id', authenticate, mediaController.getMediaById);
router.put('/:id', authenticate, mediaController.updateMedia);
router.delete('/:id', authenticate, mediaController.deleteMedia);

module.exports = router;
