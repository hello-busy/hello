# API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "user": {
    "id": "user_id",
    "username": "johndoe",
    "email": "john@example.com",
    "points": 0,
    "level": 1
  },
  "token": "jwt_token"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "user": {
    "id": "user_id",
    "username": "johndoe",
    "email": "john@example.com",
    "points": 100,
    "level": 2,
    "badges": [
      {
        "name": "First Post",
        "earnedAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  },
  "token": "jwt_token"
}
```

### Posts (Public Feed)

#### Create Post
```http
POST /api/posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My Creative Work",
  "content": "This is my creative content...",
  "isPublic": true,
  "communityId": "optional_community_id"
}
```

**Gamification:** Awards 5 points (10 for first post + First Post badge)

#### Get Public Feed
```http
GET /api/posts/feed?page=1&limit=20
Authorization: Bearer <token>
```

**Response:**
```json
{
  "posts": [
    {
      "_id": "post_id",
      "title": "My Creative Work",
      "content": "Content here...",
      "author": {
        "username": "johndoe",
        "level": 2
      },
      "likes": ["user_id1", "user_id2"],
      "comments": [],
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "page": 1,
  "totalPages": 5,
  "total": 100
}
```

#### Like Post
```http
POST /api/posts/:id/like
Authorization: Bearer <token>
```

**Gamification:** Awards 2 points to post author

#### Add Comment
```http
POST /api/posts/:id/comment
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "Great work!"
}
```

**Gamification:** Awards 2 points to commenter

### Communities

#### Create Community
```http
POST /api/communities
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Creative Writers",
  "description": "A community for writers",
  "isPrivate": true
}
```

**Gamification:** Awards 50 points + Community Creator badge

#### Get Communities
```http
GET /api/communities
Authorization: Bearer <token>
```

Returns communities that are either:
- Public (isPrivate: false)
- Or user is a member

#### Join Community
```http
POST /api/communities/:id/join
Authorization: Bearer <token>
```

**Gamification:** Awards 10 points

**Note:** Only works for public communities

### Challenges

#### Create Challenge
```http
POST /api/challenges
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Creative Writing Challenge",
  "description": "Write a short story in 500 words",
  "type": "compete",
  "points": 100,
  "startDate": "2024-01-15T00:00:00.000Z",
  "endDate": "2024-01-30T23:59:59.000Z"
}
```

**Types:**
- `compete`: Individual competition
- `collab`: Team collaboration

**Gamification:** Awards 20 points to creator

#### Get Challenges
```http
GET /api/challenges?type=compete&status=active
Authorization: Bearer <token>
```

**Query Parameters:**
- `type`: `compete` or `collab` (optional)
- `status`: `upcoming`, `active`, or `completed` (optional)

#### Join Challenge
```http
POST /api/challenges/:id/join
Authorization: Bearer <token>
```

**Gamification:** 
- Awards 10 points
- Awards Collaborator badge (for collab) or Competitor badge (for compete)

#### Submit Challenge Entry
```http
POST /api/challenges/:id/submit
Authorization: Bearer <token>
Content-Type: application/json

{
  "submission": "My submission content or URL"
}
```

**Gamification:** Awards 20 points

#### Get Leaderboard
```http
GET /api/challenges/:id/leaderboard
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "user": {
      "username": "johndoe",
      "level": 5,
      "points": 2500
    },
    "score": 950,
    "submission": "submission_content",
    "submittedAt": "2024-01-20T12:00:00.000Z"
  }
]
```

## Gamification System

### Points System

| Action | Points | Badge |
|--------|--------|-------|
| Register | 0 | - |
| Create post | 5 | First Post (first time: +10) |
| Comment | 2 | - |
| Receive like | 2 | - |
| Join community | 10 | - |
| Create community | 50 | Community Creator |
| Join challenge | 10 | Team Player / Competitor |
| Submit challenge | 20 | - |
| Create challenge | 20 | - |
| Win challenge | - | Challenge Winner (+100) |

### Level System

| Level | Points Required |
|-------|----------------|
| 1 | 0 |
| 2 | 100 |
| 3 | 250 |
| 4 | 500 |
| 5 | 1,000 |
| 6 | 2,000 |
| 7 | 5,000 |
| 8 | 10,000 |

### Badges

- **First Post**: Create your first post
- **Community Creator**: Create a community
- **Challenge Winner**: Win a challenge
- **Team Player**: Participate in a collaboration challenge
- **Competitor**: Participate in a competition challenge

## Error Responses

### 400 Bad Request
```json
{
  "error": "Error message describing what went wrong"
}
```

### 401 Unauthorized
```json
{
  "error": "Please authenticate"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Error message"
}
```

## Rate Limiting

Currently no rate limiting is implemented. Consider adding rate limiting middleware for production use.

## Best Practices

1. Always include proper error handling
2. Store JWT tokens securely (not in localStorage in production)
3. Validate all user input
4. Use HTTPS in production
5. Set strong JWT secrets
6. Implement proper CORS policies
7. Add rate limiting for production
8. Monitor and log API usage
