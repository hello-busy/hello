# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Layer                         │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Browser (public/index.html + app.js + styles.css)   │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/REST API
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Application Layer                       │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                   Express.js Server                   │  │
│  │                     (src/app.js)                      │  │
│  └───────────────────────────────────────────────────────┘  │
│                              │                               │
│  ┌───────────┬───────────────┼────────────────┬──────────┐  │
│  │           │               │                │          │  │
│  ▼           ▼               ▼                ▼          ▼  │
│  Auth      Posts      Communities      Challenges   More   │
│  Routes    Routes        Routes          Routes    Routes  │
│  │          │               │                │          │  │
│  ▼          ▼               ▼                ▼          ▼  │
│  Auth    Post        Community        Challenge           │
│  Ctrl    Ctrl           Ctrl              Ctrl            │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │               Middleware Layer                        │  │
│  │  ┌────────────────┐  ┌──────────────────────────┐   │  │
│  │  │ Authentication │  │    Gamification          │   │  │
│  │  │    (JWT)       │  │  (Points/Badges/Levels)  │   │  │
│  │  └────────────────┘  └──────────────────────────┘   │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Mongoose ODM
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       Database Layer                         │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                     MongoDB                           │  │
│  │  ┌─────────┬─────────┬──────────┬────────────────┐  │  │
│  │  │  Users  │  Posts  │  Comms   │   Challenges   │  │  │
│  │  └─────────┴─────────┴──────────┴────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Data Models

### User Model
```javascript
{
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  points: Number,
  level: Number,
  badges: [{ name, earnedAt }],
  communities: [ObjectId],
  createdAt: Date
}
```

### Community Model
```javascript
{
  name: String (unique),
  description: String,
  isPrivate: Boolean,
  creator: ObjectId (User),
  members: [{
    user: ObjectId,
    role: String,
    joinedAt: Date
  }],
  createdAt: Date
}
```

### Post Model
```javascript
{
  title: String,
  content: String,
  author: ObjectId (User),
  community: ObjectId (optional),
  isPublic: Boolean,
  likes: [ObjectId (User)],
  comments: [{
    user: ObjectId,
    content: String,
    createdAt: Date
  }],
  createdAt: Date
}
```

### Challenge Model
```javascript
{
  title: String,
  description: String,
  type: String (compete/collab),
  creator: ObjectId (User),
  participants: [{
    user: ObjectId,
    score: Number,
    submission: String,
    submittedAt: Date
  }],
  points: Number,
  startDate: Date,
  endDate: Date,
  status: String,
  createdAt: Date
}
```

## API Flow

### Authentication Flow
```
Client                    Server                  Database
  │                         │                         │
  ├─ POST /auth/register ─→ │                         │
  │                         ├─ Hash password          │
  │                         ├─ Create user ──────────→│
  │                         │                    ┌────┤
  │                         │                    │Save│
  │                         │                    └───→│
  │                         ├─ Generate JWT ←─────────┤
  │←─── { user, token } ────┤                         │
  │                         │                         │
```

### Content Creation Flow
```
Client                    Server                  Database
  │                         │                         │
  ├─ POST /posts ──────────→│                         │
  │   (with JWT token)      ├─ Verify JWT            │
  │                         ├─ Create post ──────────→│
  │                         │                    ┌────┤
  │                         │                    │Save│
  │                         │                    └───→│
  │                         ├─ Award points ─────────→│
  │                         ├─ Check badges ─────────→│
  │                         │                         │
  │←──── { post } ──────────┤←─── { updated user } ───┤
  │                         │                         │
```

### Challenge Participation Flow
```
Client              Server              Gamification          Database
  │                   │                       │                  │
  ├─ POST /join ─────→│                       │                  │
  │                   ├─ Add participant ────────────────────────→│
  │                   ├─────────────────────→│                   │
  │                   │     Award points     │                   │
  │                   │                      ├── Check badge ────→│
  │                   │                      ├── Update level ───→│
  │                   │←──── Updated user ───┤                   │
  │←─── Success ──────┤                      │                   │
  │                   │                      │                   │
```

## Component Interaction

### Frontend → Backend
- RESTful API calls
- JWT token in Authorization header
- JSON request/response format

### Backend → Database
- Mongoose ODM for data operations
- Schema validation
- Automatic timestamps

### Gamification System
- Middleware-based point calculation
- Automatic level progression
- Badge award conditions
- Integrated with all user actions

## Deployment Architecture

### Development
```
┌─────────────────┐
│  Local Machine  │
│  ┌───────────┐  │
│  │  Node.js  │  │
│  └───────────┘  │
│  ┌───────────┐  │
│  │  MongoDB  │  │
│  └───────────┘  │
└─────────────────┘
```

### Production (Docker)
```
┌──────────────────────────────────────┐
│          Docker Host                 │
│  ┌────────────────────────────────┐  │
│  │    docker-compose network      │  │
│  │  ┌──────────┐   ┌───────────┐ │  │
│  │  │   app    │───│   mongo   │ │  │
│  │  │ (Node.js)│   │ (MongoDB) │ │  │
│  │  └────┬─────┘   └───────────┘ │  │
│  │       │                        │  │
│  └───────┼────────────────────────┘  │
│          │                           │
└──────────┼───────────────────────────┘
           │
           │ Port 3000
           ▼
      [ Internet ]
```

## Security Architecture

### Authentication
- JWT tokens for stateless auth
- Passwords hashed with bcrypt
- Token expiry: 7 days

### Authorization
- Middleware checks on protected routes
- Role-based access (admin, moderator, member)
- Private community access control

### Data Protection
- Input validation
- MongoDB injection protection via Mongoose
- CORS configuration

## Scalability Considerations

### Horizontal Scaling
- Stateless API design
- JWT tokens (no server-side sessions)
- MongoDB replica sets support

### Caching Opportunities
- Public feed results
- Community lists
- Leaderboard data
- User profiles

### Future Improvements
- Redis for caching
- Load balancer for multiple app instances
- CDN for static assets
- WebSocket for real-time features
- Message queue for async processing

## Performance Optimization

### Database
- Indexes on frequently queried fields
- Population limits for related data
- Pagination for large datasets

### API
- Efficient query design
- Selective field population
- Response pagination

### Frontend
- Minimal JavaScript bundle
- Vanilla JS (no framework overhead)
- Efficient DOM updates

## Monitoring Points

### Health Checks
- `/health` endpoint
- Database connectivity
- Service status

### Metrics to Track
- API response times
- Database query performance
- User engagement rates
- Error rates
- Gamification effectiveness

## Technology Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | HTML5, CSS3, Vanilla JS | User interface |
| Backend | Node.js, Express | API server |
| Database | MongoDB | Data storage |
| ODM | Mongoose | Data modeling |
| Auth | JWT, bcrypt | Authentication |
| Container | Docker | Deployment |
| Orchestration | Docker Compose | Multi-container setup |

## Design Patterns

### MVC Pattern
- **Models**: Data schemas (src/models/)
- **Views**: Frontend UI (public/)
- **Controllers**: Business logic (src/controllers/)

### Middleware Pattern
- Authentication check
- Gamification processing
- Error handling

### Repository Pattern
- Mongoose models abstract database access
- Controllers interact with models
- Clean separation of concerns

## Request/Response Cycle

1. **Client Request**
   - User action in browser
   - JavaScript sends HTTP request
   - JWT token included

2. **Server Processing**
   - Express routes request
   - Middleware authenticates
   - Controller processes logic
   - Gamification runs
   - Database operations

3. **Response**
   - JSON data returned
   - Frontend updates UI
   - User sees result

## Error Handling Strategy

```
┌──────────────┐
│ Client Error │
└──────┬───────┘
       │
       ▼
┌──────────────────┐
│ Server Catches   │
│ - Validation     │
│ - Authorization  │
│ - Database       │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ Error Response   │
│ - Status code    │
│ - Error message  │
│ - No stack trace │
└──────────────────┘
```

This architecture provides a solid foundation for a scalable, maintainable creative content platform with robust gamification features.
