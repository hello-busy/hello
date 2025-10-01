const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const communityRoutes = require('./routes/communities');
const postRoutes = require('./routes/posts');
const challengeRoutes = require('./routes/challenges');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/communities', communityRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/challenges', challengeRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Home route
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: './public' });
});

module.exports = app;
