import Group from '../models/Group.js';
import Post from '../models/Post.js';

/**
 * Group Service class
 * Handles business logic for group operations
 */
class GroupService {
    /**
     * Create a new group
     * @param {string} userId - The ID of the user creating the group
     * @param {object} data - The group data
     * @returns {Promise<Group>} The created group
     */
    async createGroup(userId, data) {
        try {
            // Create group with admin
            const group = new Group({
                ...data,
                admin: userId,
                members: [{
                    user: userId,
                    role: 'admin',
                    joinedAt: new Date()
                }]
            });

            return await group.save();
        } catch (error) {
            throw new Error('Failed to create group');
        }
    }

    /**
     * Update group settings
     * @param {string} groupId - The ID of the group to update
     * @param {string} userId - The ID of the user updating the group
     * @param {object} data - The updated group data
     * @returns {Promise<Group>} The updated group
     */
    async updateGroup(groupId, userId, data) {
        try {
            // Get group
            const group = await Group.findById(groupId);
            if (!group) throw new Error('Group not found');

            // Check permissions
            if (!group.hasAdminPermissions(userId)) {
                throw new Error('You don\'t have permission to update this group');
            }

            // Update group
            Object.assign(group, data);
            return await group.save();
        } catch (error) {
            throw error;
        }
    }

    /**
     * Add member to group
     * @param {string} groupId - The ID of the group to add member to
     * @param {string} userId - The ID of the user adding the member
     * @param {object} data - The member data
     * @returns {Promise<Group>} The updated group
     */
    async addMember(groupId, userId, data) {
        try {
            // Get group
            const group = await Group.findById(groupId);
            if (!group) throw new Error('Group not found');

            // Check permissions
            if (!group.hasAdminPermissions(userId)) {
                throw new Error('You don\'t have permission to add members');
            }

            // Check if user is already a member
            if (group.isMember(data.userId)) {
                throw new Error('User is already a member of this group');
            }

            // Add member
            group.members.push({
                user: data.userId,
                role: data.role || 'member',
                joinedAt: new Date()
            });

            return await group.save();
        } catch (error) {
            throw error;
        }
    }

    /**
     * Remove member from group
     * @param {string} groupId - The ID of the group to remove member from
     * @param {string} userId - The ID of the user removing the member
     * @param {string} memberId - The ID of the member to remove
     * @returns {Promise<Group>} The updated group
     */
    async removeMember(groupId, userId, memberId) {
        try {
            // Get group
            const group = await Group.findById(groupId);
            if (!group) throw new Error('Group not found');

            // Check permissions
            if (!group.hasAdminPermissions(userId)) {
                throw new Error('You don\'t have permission to remove members');
            }

            // Find member index
            const memberIndex = group.members.findIndex(m => m.user.toString() === memberId);
            if (memberIndex === -1) {
                throw new Error('Member not found in group');
            }

            // Remove member
            group.members.splice(memberIndex, 1);

            return await group.save();
        } catch (error) {
            throw error;
        }
    }

    /**
     * Ban user from group
     * @param {string} groupId - The ID of the group to ban user from
     * @param {string} userId - The ID of the user banning the user
     * @param {object} data - The ban data
     * @returns {Promise<Group>} The updated group
     */
    async banUser(groupId, userId, data) {
        try {
            // Get group
            const group = await Group.findById(groupId);
            if (!group) throw new Error('Group not found');

            // Check permissions
            if (!group.hasAdminPermissions(userId)) {
                throw new Error('You don\'t have permission to ban users');
            }

            // Check if user is already banned
            if (group.isBanned(data.userId)) {
                throw new Error('User is already banned from this group');
            }

            // Add to banned users
            group.bannedUsers.push({
                user: data.userId,
                reason: data.reason,
                bannedAt: new Date()
            });

            // Remove from members if they were a member
            const memberIndex = group.members.findIndex(m => m.user.toString() === data.userId);
            if (memberIndex !== -1) {
                group.members.splice(memberIndex, 1);
            }

            return await group.save();
        } catch (error) {
            throw error;
        }
    }

    /**
     * Unban user from group
     * @param {string} groupId - The ID of the group to unban user from
     * @param {string} userId - The ID of the user unbanning the user
     * @param {string} bannedUserId - The ID of the user to unban
     * @returns {Promise<Group>} The updated group
     */
    async unbanUser(groupId, userId, bannedUserId) {
        try {
            // Get group
            const group = await Group.findById(groupId);
            if (!group) throw new Error('Group not found');

            // Check permissions
            if (!group.hasAdminPermissions(userId)) {
                throw new Error('You don\'t have permission to unban users');
            }

            // Find banned user index
            const bannedIndex = group.bannedUsers.findIndex(b => b.user.toString() === bannedUserId);
            if (bannedIndex === -1) {
                throw new Error('User is not banned from this group');
            }

            // Remove from banned users
            group.bannedUsers.splice(bannedIndex, 1);

            return await group.save();
        } catch (error) {
            throw error;
        }
    }

    /**
     * Get group details
     * @param {string} groupId - The ID of the group to get details for
     * @param {string} userId - The ID of the user getting the details
     * @returns {Promise<Group>} The group details
     */
    async getGroup(groupId, userId) {
        try {
            // Get group
            const group = await Group.findById(groupId)
                .populate('admin', 'name username profilePic')
                .populate('members.user', 'name username profilePic')
                .populate('bannedUsers.user', 'name username profilePic')
                .populate('posts', 'content author likes comments');

            if (!group) throw new Error('Group not found');

            // Check if user is banned
            if (group.isBanned(userId)) {
                throw new Error('You are banned from this group');
            }

            return group;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Get user's groups
     * @param {string} userId - The ID of the user to get groups for
     * @returns {Promise<Group[]>} The user's groups
     */
    async getUserGroups(userId) {
        try {
            // Get groups where user is a member
            const groups = await Group.find({
                $or: [
                    { admin: userId },
                    { 'members.user': userId }
                ]
            })
            .populate('admin', 'name username profilePic')
            .populate('members.user', 'name username profilePic')
            .populate('bannedUsers.user', 'name username profilePic');

            return groups;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Create post in group
     * @param {string} groupId - The ID of the group to create post in
     * @param {string} userId - The ID of the user creating the post
     * @param {string} postContent - The post content
     * @returns {Promise<Post>} The created post
     */
    async createPost(groupId, userId, postContent) {
        try {
            // Get group
            const group = await Group.findById(groupId);
            if (!group) throw new Error('Group not found');

            // Check if user is banned
            if (group.isBanned(userId)) {
                throw new Error('You are banned from this group');
            }

            // Check if user is a member
            if (!group.isMember(userId)) {
                throw new Error('You must be a member of this group to post');
            }

            // Create post
            const post = new Post({
                content: postContent,
                author: userId,
                group: groupId
            });

            // Save post and add to group
            const savedPost = await post.save();
            group.posts.push(savedPost._id);
            await group.save();

            return savedPost;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Get group posts
     * @param {string} groupId - The ID of the group to get posts for
     * @param {string} userId - The ID of the user getting the posts
     * @returns {Promise<Post[]>} The group posts
     */
    async getGroupPosts(groupId, userId) {
        try {
            // Get group
            const group = await Group.findById(groupId);
            if (!group) throw new Error('Group not found');

            // Check if user is banned
            if (group.isBanned(userId)) {
                throw new Error('You are banned from this group');
            }

            // Get posts
            const posts = await Post.find({ group: groupId })
                .populate('author', 'name username profilePic')
                .populate('likes', 'name username profilePic')
                .populate('comments.author', 'name username profilePic')
                .sort({ createdAt: -1 });

            return posts;
        } catch (error) {
            throw error;
        }
    }
}

export default GroupService;
