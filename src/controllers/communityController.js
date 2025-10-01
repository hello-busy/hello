const Community = require('../models/Community');
const { awardPoints, BADGES } = require('../middleware/gamification');

const createCommunity = async (req, res) => {
  try {
    const { name, description, isPrivate } = req.body;

    const community = new Community({
      name,
      description,
      isPrivate: isPrivate !== undefined ? isPrivate : true,
      creator: req.user._id,
      members: [{
        user: req.user._id,
        role: 'admin',
      }],
    });

    await community.save();
    await awardPoints(req.user._id, 50, 'COMMUNITY_CREATOR');

    res.status(201).json(community);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCommunities = async (req, res) => {
  try {
    const communities = await Community.find({
      $or: [
        { isPrivate: false },
        { 'members.user': req.user._id },
      ],
    }).populate('creator', 'username');

    res.json(communities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const joinCommunity = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);
    
    if (!community) {
      return res.status(404).json({ error: 'Community not found' });
    }

    if (community.isPrivate) {
      return res.status(403).json({ error: 'This is a private community' });
    }

    const isMember = community.members.some(
      m => m.user.toString() === req.user._id.toString()
    );

    if (isMember) {
      return res.status(400).json({ error: 'Already a member' });
    }

    community.members.push({
      user: req.user._id,
      role: 'member',
    });

    await community.save();
    await awardPoints(req.user._id, 10);

    res.json(community);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createCommunity, getCommunities, joinCommunity };
