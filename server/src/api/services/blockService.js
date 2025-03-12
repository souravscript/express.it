import Block from '../models/Block.js';
import Follow from '../models/Follow.js';
import User from '../models/User.js';

class BlockService {
    // Block a user
    async blockUser(blockerId, blockedId) {
        try {
            // Check if the user is already blocked
            const existingBlock = await Block.findOne({
                blockerId,
                blockedId
            });

            if (existingBlock) {
                throw new Error('Already blocked this user');
            }

            // Create new block relationship
            const block = new Block({
                blockerId,
                blockedId
            });

            await block.save();

            // Update blocked count for both users
            await User.findByIdAndUpdate(blockerId, {
                $inc: { blockedCount: 1 }
            });

            await User.findByIdAndUpdate(blockedId, {
                $inc: { blockedByCount: 1 }
            });

            // Remove any existing follow relationship
            await Follow.deleteOne({
                followerId: blockerId,
                followingId: blockedId
            });

            return block;
        } catch (error) {
            throw error;
        }
    }

    // Unblock a user
    async unblockUser(blockerId, blockedId) {
        try {
            // Find and remove the block relationship
            const block = await Block.findOneAndDelete({
                blockerId,
                blockedId
            });

            if (!block) {
                throw new Error('Not blocking this user');
            }

            // Update blocked count for both users
            await User.findByIdAndUpdate(blockerId, {
                $inc: { blockedCount: -1 }
            });

            await User.findByIdAndUpdate(blockedId, {
                $inc: { blockedByCount: -1 }
            });

            return block;
        } catch (error) {
            throw error;
        }
    }

    // Get a user's blocked users
    async getBlockedUsers(userId, page = 1, limit = 10) {
        try {
            const skip = (page - 1) * limit;

            const blockedUsers = await Block.find({ blockerId: userId })
                .populate('blockedId', 'username profilePic name')
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 });

            const totalBlocked = await Block.countDocuments({ blockerId: userId });

            return {
                blockedUsers,
                totalPages: Math.ceil(totalBlocked / limit),
                currentPage: page,
                totalBlocked
            };
        } catch (error) {
            throw error;
        }
    }

    // Get users blocking a user
    async getBlockingUsers(userId, page = 1, limit = 10) {
        try {
            const skip = (page - 1) * limit;

            const blockingUsers = await Block.find({ blockedId: userId })
                .populate('blockerId', 'username profilePic name')
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 });

            const totalBlocking = await Block.countDocuments({ blockedId: userId });

            return {
                blockingUsers,
                totalPages: Math.ceil(totalBlocking / limit),
                currentPage: page,
                totalBlocking
            };
        } catch (error) {
            throw error;
        }
    }

    // Check if user is blocking another user
    async isBlocking(blockerId, blockedId) {
        try {
            const block = await Block.findOne({
                blockerId,
                blockedId
            });

            return !!block;
        } catch (error) {
            throw error;
        }
    }
}

export default new BlockService();
