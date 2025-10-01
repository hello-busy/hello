const Challenge = require('../models/Challenge');
const { awardPoints, BADGES } = require('../middleware/gamification');

const createChallenge = async (req, res) => {
  try {
    const { title, description, type, points, startDate, endDate } = req.body;

    const challenge = new Challenge({
      title,
      description,
      type,
      creator: req.user._id,
      points: points || 100,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      status: new Date(startDate) > new Date() ? 'upcoming' : 'active',
    });

    await challenge.save();
    await awardPoints(req.user._id, 20);

    res.status(201).json(challenge);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getChallenges = async (req, res) => {
  try {
    const { type, status } = req.query;
    const filter = {};

    if (type) filter.type = type;
    if (status) filter.status = status;

    const challenges = await Challenge.find(filter)
      .sort({ createdAt: -1 })
      .populate('creator', 'username level');

    res.json(challenges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const joinChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    
    if (!challenge) {
      return res.status(404).json({ error: 'Challenge not found' });
    }

    if (challenge.status === 'completed') {
      return res.status(400).json({ error: 'Challenge is already completed' });
    }

    const isParticipant = challenge.participants.some(
      p => p.user.toString() === req.user._id.toString()
    );

    if (isParticipant) {
      return res.status(400).json({ error: 'Already participating' });
    }

    challenge.participants.push({
      user: req.user._id,
    });

    await challenge.save();
    
    const badgeType = challenge.type === 'collab' ? 'COLLABORATOR' : 'COMPETITOR';
    await awardPoints(req.user._id, 10, badgeType);

    res.json(challenge);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const submitChallenge = async (req, res) => {
  try {
    const { submission } = req.body;
    const challenge = await Challenge.findById(req.params.id);
    
    if (!challenge) {
      return res.status(404).json({ error: 'Challenge not found' });
    }

    const participant = challenge.participants.find(
      p => p.user.toString() === req.user._id.toString()
    );

    if (!participant) {
      return res.status(400).json({ error: 'Not a participant' });
    }

    participant.submission = submission;
    participant.submittedAt = new Date();

    await challenge.save();
    await awardPoints(req.user._id, 20);

    res.json(challenge);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLeaderboard = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id)
      .populate('participants.user', 'username level points');
    
    if (!challenge) {
      return res.status(404).json({ error: 'Challenge not found' });
    }

    const leaderboard = challenge.participants
      .filter(p => p.score > 0)
      .sort((a, b) => b.score - a.score);

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createChallenge,
  getChallenges,
  joinChallenge,
  submitChallenge,
  getLeaderboard,
};
