const Post = require('../models/Post');
const { awardPoints, BADGES } = require('../middleware/gamification');

const createPost = async (req, res) => {
  try {
    const { title, content, communityId, isPublic } = req.body;

    const post = new Post({
      title,
      content,
      author: req.user._id,
      community: communityId,
      isPublic: isPublic !== undefined ? isPublic : true,
    });

    await post.save();
    
    // Check if this is user's first post
    const userPosts = await Post.countDocuments({ author: req.user._id });
    if (userPosts === 1) {
      await awardPoints(req.user._id, 10, 'FIRST_POST');
    } else {
      await awardPoints(req.user._id, 5);
    }

    const populatedPost = await Post.findById(post._id)
      .populate('author', 'username level')
      .populate('community', 'name');

    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPublicFeed = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const posts = await Post.find({ isPublic: true })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'username level badges')
      .populate('community', 'name');

    const total = await Post.countDocuments({ isPublic: true });

    res.json({
      posts,
      page,
      totalPages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const hasLiked = post.likes.includes(req.user._id);

    if (hasLiked) {
      post.likes = post.likes.filter(
        id => id.toString() !== req.user._id.toString()
      );
    } else {
      post.likes.push(req.user._id);
      await awardPoints(post.author, 2);
    }

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.comments.push({
      user: req.user._id,
      content: req.body.content,
    });

    await post.save();
    await awardPoints(req.user._id, 2);

    const populatedPost = await Post.findById(post._id)
      .populate('author', 'username level')
      .populate('comments.user', 'username level');

    res.json(populatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createPost, getPublicFeed, likePost, addComment };
