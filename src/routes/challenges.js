const express = require('express');
const {
  createChallenge,
  getChallenges,
  joinChallenge,
  submitChallenge,
  getLeaderboard,
} = require('../controllers/challengeController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, createChallenge);
router.get('/', auth, getChallenges);
router.post('/:id/join', auth, joinChallenge);
router.post('/:id/submit', auth, submitChallenge);
router.get('/:id/leaderboard', auth, getLeaderboard);

module.exports = router;
