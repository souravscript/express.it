import followService from '../services/followService.js';
import { validate, followSchema, unfollowSchema } from '../middlewares/zodValidation.js';

/**
 * @swagger
 * /follow/{userId}:
 *   post:
 *     tags: [Follow]
 *     summary: Follow a user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to follow
 *     responses:
 *       201:
 *         description: Successfully followed user
 *       400:
 *         description: Already following this user
 *       401:
 *         description: Unauthorized
 */
export const followUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const followerId = req.user.id;

        if (followerId === userId) {
            return res.status(400).json({
                success: false,
                message: 'Cannot follow yourself'
            });
        }

        const follow = await followService.followUser(followerId, userId);

        res.status(201).json({
            success: true,
            message: 'Successfully followed user',
            data: follow
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * @swagger
 * /unfollow/{userId}:
 *   delete:
 *     tags: [Follow]
 *     summary: Unfollow a user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to unfollow
 *     responses:
 *       200:
 *         description: Successfully unfollowed user
 *       400:
 *         description: Not following this user
 *       401:
 *         description: Unauthorized
 */
export const unfollowUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const followerId = req.user.id;

        if (followerId === userId) {
            return res.status(400).json({
                success: false,
                message: 'Cannot unfollow yourself'
            });
        }

        const follow = await followService.unfollowUser(followerId, userId);

        res.status(200).json({
            success: true,
            message: 'Successfully unfollowed user',
            data: follow
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * @swagger
 * /followers:
 *   get:
 *     tags: [Follow]
 *     summary: Get user's followers
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of followers per page
 *     responses:
 *       200:
 *         description: List of followers
 *       401:
 *         description: Unauthorized
 */
export const getFollowers = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const userId = req.user.id;

        const followers = await followService.getFollowers(userId, page, limit);

        res.status(200).json({
            success: true,
            data: followers
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * @swagger
 * /following:
 *   get:
 *     tags: [Follow]
 *     summary: Get user's following
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of following per page
 *     responses:
 *       200:
 *         description: List of following
 *       401:
 *         description: Unauthorized
 */
export const getFollowing = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const userId = req.user.id;

        const following = await followService.getFollowing(userId, page, limit);

        res.status(200).json({
            success: true,
            data: following
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * @swagger
 * /is-following/{userId}:
 *   get:
 *     tags: [Follow]
 *     summary: Check if user is following another user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to check
 *     responses:
 *       200:
 *         description: Follow status
 *       401:
 *         description: Unauthorized
 */
export const isFollowing = async (req, res) => {
    try {
        const { userId } = req.params;
        const followerId = req.user.id;

        const isFollowing = await followService.isFollowing(followerId, userId);

        res.status(200).json({
            success: true,
            data: { isFollowing }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
