const express = require('express');
const {
  createPost,
  getPublicFeed,
  likePost,
  addComment,
} = require('../controllers/postController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, createPost);
router.get('/feed', auth, getPublicFeed);
router.post('/:id/like', auth, likePost);
router.post('/:id/comment', auth, addComment);

module.exports = router;
