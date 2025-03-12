import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import {
    followUser,
    unfollowUser,
    getFollowers,
    getFollowing,
    isFollowing
} from '../controllers/followController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Follow
 *   description: API for managing user follows
 */

// Follow a user
router.post('/:userId', verifyToken, followUser);

// Unfollow a user
router.delete('/:userId', verifyToken, unfollowUser);

// Get user's followers
router.get('/followers', verifyToken, getFollowers);

// Get user's following
router.get('/following', verifyToken, getFollowing);

// Check if user is following another user
router.get('/is-following/:userId', verifyToken, isFollowing);

export default router;
