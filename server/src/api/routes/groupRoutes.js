import express from 'express';
import { z } from 'zod';
import { zodValidation } from '../../middlewares/zodValidation.js';
import groupService from '../services/groupService.js';

const router = express.Router();

// Create a new group
router.post('/', zodValidation({
    body: z.object({
        name: z.string().min(3).max(50),
        description: z.string().max(500).optional(),
        isPrivate: z.boolean().optional(),
        rules: z.array(z.object({
            rule: z.string().min(1),
            description: z.string().optional()
        })).optional()
    })
}), async (req, res) => {
    try {
        const group = await groupService.createGroup(req.user._id, req.body);
        res.status(201).json(group);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update group settings
router.put('/:groupId', zodValidation({
    params: z.object({
        groupId: z.string()
    }),
    body: z.object({
        name: z.string().min(3).max(50).optional(),
        description: z.string().max(500).optional(),
        isPrivate: z.boolean().optional(),
        rules: z.array(z.object({
            rule: z.string().min(1),
            description: z.string().optional()
        })).optional()
    })
}), async (req, res) => {
    try {
        const group = await groupService.updateGroup(req.params.groupId, req.user._id, req.body);
        res.json(group);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Add member to group
router.post('/:groupId/members', zodValidation({
    params: z.object({
        groupId: z.string()
    }),
    body: z.object({
        userId: z.string(),
        role: z.enum(['member', 'moderator']).optional()
    })
}), async (req, res) => {
    try {
        const group = await groupService.addMember(req.params.groupId, req.user._id, req.body);
        res.json(group);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Remove member from group
router.delete('/:groupId/members/:memberId', zodValidation({
    params: z.object({
        groupId: z.string(),
        memberId: z.string()
    })
}), async (req, res) => {
    try {
        const group = await groupService.removeMember(req.params.groupId, req.user._id, req.params.memberId);
        res.json(group);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Ban user from group
router.post('/:groupId/ban', zodValidation({
    params: z.object({
        groupId: z.string()
    }),
    body: z.object({
        userId: z.string(),
        reason: z.string().optional()
    })
}), async (req, res) => {
    try {
        const group = await groupService.banUser(req.params.groupId, req.user._id, req.body);
        res.json(group);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Unban user from group
router.delete('/:groupId/ban/:bannedUserId', zodValidation({
    params: z.object({
        groupId: z.string(),
        bannedUserId: z.string()
    })
}), async (req, res) => {
    try {
        const group = await groupService.unbanUser(req.params.groupId, req.user._id, req.params.bannedUserId);
        res.json(group);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get group details
router.get('/:groupId', zodValidation({
    params: z.object({
        groupId: z.string()
    })
}), async (req, res) => {
    try {
        const group = await groupService.getGroup(req.params.groupId, req.user._id);
        res.json(group);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get user's groups
router.get('/user/groups', async (req, res) => {
    try {
        const groups = await groupService.getUserGroups(req.user._id);
        res.json(groups);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Create post in group
router.post('/:groupId/posts', zodValidation({
    params: z.object({
        groupId: z.string()
    }),
    body: z.object({
        content: z.string().min(1)
    })
}), async (req, res) => {
    try {
        const post = await groupService.createPost(req.params.groupId, req.user._id, req.body.content);
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get group posts
router.get('/:groupId/posts', zodValidation({
    params: z.object({
        groupId: z.string()
    })
}), async (req, res) => {
    try {
        const posts = await groupService.getGroupPosts(req.params.groupId, req.user._id);
        res.json(posts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
