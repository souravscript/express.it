import Follow from '../models/Follow.js';
import User from '../models/User.js';

class FollowService {
    // Follow a user
    async followUser(followerId, followingId) {
        try {
            // Check if the user is already following
            const existingFollow = await Follow.findOne({
                followerId,
                followingId
            });

            if (existingFollow) {
                throw new Error('Already following this user');
            }

            // Create new follow relationship
            const follow = new Follow({
                followerId,
                followingId
            });

            await follow.save();

            // Update followers count for both users
            await User.findByIdAndUpdate(followerId, {
                $inc: { followingCount: 1 }
            });

            await User.findByIdAndUpdate(followingId, {
                $inc: { followersCount: 1 }
            });

            return follow;
        } catch (error) {
            throw error;
        }
    }

    // Unfollow a user
    async unfollowUser(followerId, followingId) {
        try {
            // Find and remove the follow relationship
            const follow = await Follow.findOneAndDelete({
                followerId,
                followingId
            });

            if (!follow) {
                throw new Error('Not following this user');
            }

            // Update followers count for both users
            await User.findByIdAndUpdate(followerId, {
                $inc: { followingCount: -1 }
            });

            await User.findByIdAndUpdate(followingId, {
                $inc: { followersCount: -1 }
            });

            return follow;
        } catch (error) {
            throw error;
        }
    }

    // Get a user's followers
    async getFollowers(userId, page = 1, limit = 10) {
        try {
            const skip = (page - 1) * limit;

            const followers = await Follow.find({ followingId: userId })
                .populate('followerId', 'username profilePic name')
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 });

            const totalFollowers = await Follow.countDocuments({ followingId: userId });

            return {
                followers,
                totalPages: Math.ceil(totalFollowers / limit),
                currentPage: page,
                totalFollowers
            };
        } catch (error) {
            throw error;
        }
    }

    // Get a user's following
    async getFollowing(userId, page = 1, limit = 10) {
        try {
            const skip = (page - 1) * limit;

            const following = await Follow.find({ followerId: userId })
                .populate('followingId', 'username profilePic name')
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 });

            const totalFollowing = await Follow.countDocuments({ followerId: userId });

            return {
                following,
                totalPages: Math.ceil(totalFollowing / limit),
                currentPage: page,
                totalFollowing
            };
        } catch (error) {
            throw error;
        }
    }

    // Check if user is following another user
    async isFollowing(followerId, followingId) {
        try {
            const follow = await Follow.findOne({
                followerId,
                followingId
            });

            return !!follow;
        } catch (error) {
            throw error;
        }
    }
}

export default new FollowService();
