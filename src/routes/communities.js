const express = require('express');
const {
  createCommunity,
  getCommunities,
  joinCommunity,
} = require('../controllers/communityController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, createCommunity);
router.get('/', auth, getCommunities);
router.post('/:id/join', auth, joinCommunity);

module.exports = router;
