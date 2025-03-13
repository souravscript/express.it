import GroupService from '../services/groupService.js';
import { z } from 'zod';

// Validation schemas
const createGroupSchema = z.object({
    name: z.string().min(3).max(50),
    description: z.string().max(500).optional(),
    isPrivate: z.boolean().optional(),
    rules: z.array(z.object({
        rule: z.string().min(1),
        description: z.string().optional()
    })).optional()
});

const updateGroupSchema = z.object({
    name: z.string().min(3).max(50).optional(),
    description: z.string().max(500).optional(),
    isPrivate: z.boolean().optional(),
    rules: z.array(z.object({
        rule: z.string().min(1),
        description: z.string().optional()
    })).optional()
});

const addMemberSchema = z.object({
    userId: z.string(),
    role: z.enum(['member', 'moderator']).optional()
});

const banUserSchema = z.object({
    userId: z.string(),
    reason: z.string().optional()
});

const groupService = new GroupService();

/**
 * Group Controller
 * 
 * Handles group-related operations
 */
class GroupController {
    /**
     * Create a new group
     * 
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     */
    async createGroup(req, res) {
        try {
            const userId = req.user.id;
            const data = req.body;

            const validatedData = createGroupSchema.parse(data);
            const group = await groupService.createGroup(userId, validatedData);

            res.status(201).json(group);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    /**
     * Update group settings
     * 
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     */
    async updateGroup(req, res) {
        try {
            const { groupId } = req.params;
            const userId = req.user.id;
            const data = req.body;

            const validatedData = updateGroupSchema.parse(data);
            const group = await groupService.updateGroup(groupId, userId, validatedData);

            res.json(group);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    /**
     * Add member to group
     * 
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     */
    async addMember(req, res) {
        try {
            const { groupId } = req.params;
            const userId = req.user.id;
            const data = req.body;

            const validatedData = addMemberSchema.parse(data);
            const group = await groupService.addMember(groupId, userId, validatedData);

            res.json(group);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    /**
     * Remove member from group
     * 
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     */
    async removeMember(req, res) {
        try {
            const { groupId, memberId } = req.params;
            const userId = req.user.id;

            const group = await groupService.removeMember(groupId, userId, memberId);
            res.json(group);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    /**
     * Ban user from group
     * 
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     */
    async banUser(req, res) {
        try {
            const { groupId } = req.params;
            const userId = req.user.id;
            const data = req.body;

            const validatedData = banUserSchema.parse(data);
            const group = await groupService.banUser(groupId, userId, validatedData);

            res.json(group);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    /**
     * Unban user from group
     * 
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     */
    async unbanUser(req, res) {
        try {
            const { groupId, bannedUserId } = req.params;
            const userId = req.user.id;

            const group = await groupService.unbanUser(groupId, userId, bannedUserId);
            res.json(group);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    /**
     * Get group details
     * 
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     */
    async getGroup(req, res) {
        try {
            const { groupId } = req.params;
            const userId = req.user.id;

            const group = await groupService.getGroup(groupId, userId);
            res.json(group);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    /**
     * Get user's groups
     * 
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     */
    async getUserGroups(req, res) {
        try {
            const userId = req.user.id;

            const groups = await groupService.getUserGroups(userId);
            res.json(groups);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    /**
     * Create post in group
     * 
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     */
    async createPost(req, res) {
        try {
            const { groupId } = req.params;
            const userId = req.user.id;
            const postContent = req.body.content;

            const post = await groupService.createPost(groupId, userId, postContent);
            res.status(201).json(post);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    /**
     * Get group posts
     * 
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     */
    async getGroupPosts(req, res) {
        try {
            const { groupId } = req.params;
            const userId = req.user.id;

            const posts = await groupService.getGroupPosts(groupId, userId);
            res.json(posts);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default new GroupController();
