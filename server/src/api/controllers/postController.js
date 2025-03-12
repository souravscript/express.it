const postService = require('../services/postService');

exports.createPost = async (req, res, next) => {
  try {
    const { content } = req.body;
    const post = await postService.createPost(req.user._id, content);
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

exports.getPosts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const posts = await postService.getPosts(req.user._id, page, limit);
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    const post = await postService.getPostById(req.params.id);
    res.json(post);
  } catch (error) {
    next(error);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const { content } = req.body;
    const post = await postService.updatePost(req.params.id, req.user._id, content);
    res.json(post);
  } catch (error) {
    next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const result = await postService.deletePost(req.params.id, req.user._id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.likePost = async (req, res, next) => {
  try {
    const post = await postService.likePost(req.params.id, req.user._id);
    res.json(post);
  } catch (error) {
    next(error);
  }
};

exports.unlikePost = async (req, res, next) => {
  try {
    const post = await postService.unlikePost(req.params.id, req.user._id);
    res.json(post);
  } catch (error) {
    next(error);
  }
};

exports.addComment = async (req, res, next) => {
  try {
    const { content } = req.body;
    const post = await postService.addComment(req.params.id, req.user._id, content);
    res.json(post);
  } catch (error) {
    next(error);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const post = await postService.deleteComment(req.params.postId, req.params.commentId, req.user._id);
    res.json(post);
  } catch (error) {
    next(error);
  }
};
