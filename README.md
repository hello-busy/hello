# Hello - Creative Content Platform

A comprehensive platform for creative collaboration and competition with gamification features.

## Features

### 🌍 Public Feed
- Share creative content publicly with the entire community
- Like and comment on posts
- Real-time engagement tracking

### 🔒 Private Communities
- Create and manage private communities
- Control access to exclusive content
- Community-specific discussions and collaboration

### 🤝 Collaboration (Collab)
- Team-based creative challenges
- Shared content creation
- Collaborative achievements

### ⚔️ Competition (Compete)
- Individual and team competitions
- Leaderboards and rankings
- Performance tracking

### 🎮 Gamification System
- **Points System**: Earn points for activities
- **Level Progression**: 8 levels from beginner to expert
- **Badges**: Unlock achievements
  - First Post (10 pts)
  - Community Creator (50 pts)
  - Challenge Winner (100 pts)
  - Team Player (25 pts)
  - Competitor (25 pts)

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Containerization**: Docker, Docker Compose

## Quick Start

### Using Docker (Recommended)

1. Clone the repository
2. Run the application:
```bash
docker-compose up -d
```
3. Access the application at `http://localhost:3000`

### Manual Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update environment variables in `.env`:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/hello
JWT_SECRET=your-secret-key-change-in-production
```

4. Start MongoDB (if not using Docker)

5. Start the application:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Posts (Public Feed)
- `POST /api/posts` - Create a post
- `GET /api/posts/feed` - Get public feed
- `POST /api/posts/:id/like` - Like a post
- `POST /api/posts/:id/comment` - Comment on a post

### Communities
- `POST /api/communities` - Create community
- `GET /api/communities` - Get accessible communities
- `POST /api/communities/:id/join` - Join a community

### Challenges
- `POST /api/challenges` - Create challenge
- `GET /api/challenges` - Get challenges (filter by type/status)
- `POST /api/challenges/:id/join` - Join challenge
- `POST /api/challenges/:id/submit` - Submit challenge entry
- `GET /api/challenges/:id/leaderboard` - Get challenge leaderboard

## Architecture

```
hello/
├── src/
│   ├── config/         # Configuration files
│   │   └── database.js # Database connection
│   ├── controllers/    # Business logic
│   │   ├── authController.js
│   │   ├── communityController.js
│   │   ├── postController.js
│   │   └── challengeController.js
│   ├── middleware/     # Custom middleware
│   │   ├── auth.js     # Authentication
│   │   └── gamification.js # Gamification logic
│   ├── models/         # Data models
│   │   ├── User.js
│   │   ├── Community.js
│   │   ├── Post.js
│   │   └── Challenge.js
│   ├── routes/         # API routes
│   │   ├── auth.js
│   │   ├── communities.js
│   │   ├── posts.js
│   │   └── challenges.js
│   ├── app.js          # Express app
│   └── server.js       # Server entry point
├── public/             # Frontend files
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── Dockerfile          # Container definition
└── docker-compose.yml  # Multi-container setup
```

## Deployment

### Single Container Deployment

The application is designed to run as a single container with all necessary components:

```bash
docker build -t hello-platform .
docker run -p 3000:3000 hello-platform
```

For production with database:
```bash
docker-compose up -d
```

## Gamification Details

### Point Awards
- Create post: 5 points (10 for first post)
- Comment: 2 points
- Receive like: 2 points
- Join community: 10 points
- Create community: 50 points
- Join challenge: 10 points
- Submit challenge: 20 points
- Create challenge: 20 points

### Level Thresholds
- Level 1: 0-99 points
- Level 2: 100-249 points
- Level 3: 250-499 points
- Level 4: 500-999 points
- Level 5: 1000-1999 points
- Level 6: 2000-4999 points
- Level 7: 5000-9999 points
- Level 8: 10000+ points

## Development

### Running Tests
```bash
npm test
```

### Code Structure
- **Models**: Define data schemas and relationships
- **Controllers**: Handle business logic and data processing
- **Routes**: Define API endpoints and map to controllers
- **Middleware**: Handle cross-cutting concerns (auth, gamification)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

ISC
