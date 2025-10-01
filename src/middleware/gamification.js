const User = require('../models/User');

const BADGES = {
  FIRST_POST: { name: 'First Post', points: 10 },
  COMMUNITY_CREATOR: { name: 'Community Creator', points: 50 },
  CHALLENGE_WINNER: { name: 'Challenge Winner', points: 100 },
  COLLABORATOR: { name: 'Team Player', points: 25 },
  COMPETITOR: { name: 'Competitor', points: 25 },
};

const LEVEL_THRESHOLDS = [0, 100, 250, 500, 1000, 2000, 5000, 10000];

const awardPoints = async (userId, points, badgeName = null) => {
  try {
    const user = await User.findById(userId);
    if (!user) return;

    user.points += points;
    
    // Calculate new level
    const newLevel = LEVEL_THRESHOLDS.findIndex(threshold => user.points < threshold);
    user.level = newLevel === -1 ? LEVEL_THRESHOLDS.length : newLevel;

    // Award badge if provided
    if (badgeName && BADGES[badgeName]) {
      const badgeExists = user.badges.some(b => b.name === BADGES[badgeName].name);
      if (!badgeExists) {
        user.badges.push({
          name: BADGES[badgeName].name,
          earnedAt: new Date(),
        });
      }
    }

    await user.save();
    return user;
  } catch (error) {
    console.error('Error awarding points:', error);
  }
};

module.exports = { awardPoints, BADGES };
