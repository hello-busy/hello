# Usage Guide

## Getting Started

### 1. Launch the Platform

#### Option A: Using Docker (Recommended)
```bash
docker-compose up -d
```

The application will be available at `http://localhost:3000`

#### Option B: Manual Setup
```bash
# Start MongoDB
mongod

# In another terminal
npm start
```

### 2. Create an Account

1. Open your browser and go to `http://localhost:3000`
2. Fill in the registration form:
   - Choose a unique username
   - Enter your email
   - Create a secure password
3. Click "Register"
4. You'll be automatically logged in

### 3. Explore the Platform

## Core Features

### Public Feed

The public feed is where users share their creative content with everyone.

**To create a post:**
1. Click "Create Post" button
2. Enter a title
3. Write your content
4. Check "Public" if you want everyone to see it
5. Click "Post"

**Points earned:** 5 points (10 for your first post!)

**To interact with posts:**
- Click "👍 Like" to like a post (author earns 2 points)
- Click "💬 Comments" to read or add comments (earn 2 points per comment)

### Private Communities

Communities are spaces where specific groups can share and collaborate.

**To create a community:**
1. Click "Create Community"
2. Enter a name
3. Write a description
4. Check "Private" to make it invite-only
5. Click "Create"

**Points earned:** 50 points + Community Creator badge

**To join a community:**
- Public communities show a "Join" button
- Click it to become a member (earn 10 points)
- Private communities require an invitation

### Challenges

Challenges are the heart of collaboration and competition on the platform.

#### Types of Challenges

**🤝 Collab (Collaboration)**
- Work together with others
- Shared objectives
- Team-based achievements
- Earn "Team Player" badge

**⚔️ Compete (Competition)**
- Individual challenges
- Leaderboards
- Rankings
- Earn "Competitor" badge

**To create a challenge:**
1. Click "Create Challenge"
2. Enter title and description
3. Select type (Collab or Compete)
4. Set points reward
5. Choose start and end dates
6. Click "Create"

**Points earned:** 20 points

**To participate:**
1. Find a challenge you like
2. Click "Join"
3. Submit your entry before the deadline
4. Check the leaderboard to see standings

**Points earned:** 10 points for joining + 20 for submitting

## Gamification

### Understanding Your Progress

Your profile shows:
- **Level Badge**: Your current level (1-8)
- **Points**: Total points earned
- **Badges**: Special achievements unlocked

### Earning Points

Every action on the platform earns you points:

| Action | Points |
|--------|--------|
| First post | 10 |
| Regular post | 5 |
| Comment | 2 |
| Your post gets liked | 2 |
| Join community | 10 |
| Create community | 50 |
| Join challenge | 10 |
| Submit challenge | 20 |
| Create challenge | 20 |

### Leveling Up

As you earn points, you automatically level up:

- **Level 1** (Beginner): 0-99 points
- **Level 2** (Novice): 100-249 points
- **Level 3** (Apprentice): 250-499 points
- **Level 4** (Skilled): 500-999 points
- **Level 5** (Expert): 1,000-1,999 points
- **Level 6** (Master): 2,000-4,999 points
- **Level 7** (Grandmaster): 5,000-9,999 points
- **Level 8** (Legend): 10,000+ points

### Collecting Badges

Unlock special badges for achievements:

- 🏆 **First Post**: Create your first post
- 👥 **Community Creator**: Create a community
- 🥇 **Challenge Winner**: Win a competition
- 🤝 **Team Player**: Join a collaboration challenge
- ⚔️ **Competitor**: Join a competition challenge

## Tips for Success

### Building Your Profile
1. **Start with a post**: Share your work to earn your first badge
2. **Join communities**: Connect with like-minded creators
3. **Engage actively**: Comment and like to build relationships
4. **Take on challenges**: Regular participation levels you up faster

### Creating Great Content
1. **Be original**: Share your unique perspective
2. **Engage with others**: Build a community around your work
3. **Use descriptive titles**: Help others find your content
4. **Stay consistent**: Regular posting keeps you engaged

### Maximizing Points
1. **Post daily**: 5 points per post adds up
2. **Comment thoughtfully**: Quality engagement earns respect
3. **Create communities**: 50 points + long-term benefits
4. **Participate in challenges**: Multiple point opportunities

### Community Building
1. **Create a niche community**: Focus on specific interests
2. **Encourage participation**: Active communities are successful
3. **Set clear guidelines**: Private communities need structure
4. **Collaborate often**: Use collab challenges to build teams

### Challenge Strategies

**For Compete Challenges:**
- Submit early to set the pace
- Check the leaderboard regularly
- Focus on quality over quantity
- Learn from top submissions

**For Collab Challenges:**
- Communicate with team members
- Build on others' ideas
- Share resources and knowledge
- Celebrate team achievements

## Troubleshooting

### Can't see private communities?
- You must be a member to see private communities
- Ask the creator for an invitation

### Challenge won't let me join?
- Check if the challenge has already started or ended
- Ensure you meet any prerequisites

### Not earning points?
- Make sure you're logged in
- Check that the action completed successfully
- Points are awarded immediately upon completion

### Lost your progress?
- Make sure you're logged into the correct account
- Check your email to confirm registration

## Privacy & Settings

### Post Privacy
- **Public posts**: Visible to everyone in the public feed
- **Community posts**: Visible only to community members
- You can choose per post

### Community Privacy
- **Public**: Anyone can see and join
- **Private**: Only members can see content

## Best Practices

### For Creators
- Post regularly to maintain visibility
- Engage with your audience
- Use communities to build dedicated followers
- Participate in challenges to showcase skills

### For Community Managers
- Set clear community guidelines
- Encourage active participation
- Host regular challenges
- Recognize top contributors

### For Challenge Hosts
- Set realistic timeframes
- Provide clear objectives
- Engage with participants
- Celebrate all submissions

## Getting Help

If you encounter issues:
1. Check this guide
2. Review the API documentation (API.md)
3. Check the README for technical details
4. Report bugs to the repository

## Next Steps

1. **Complete your profile**: Make your first post
2. **Join a community**: Connect with others
3. **Take on a challenge**: Test your skills
4. **Create something new**: Start your own community or challenge

Happy creating! 🎨✨
