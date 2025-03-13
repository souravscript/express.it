import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "Group name must be at least 3 characters long"],
        maxlength: [50, "Group name cannot exceed 50 characters"]
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, "Description cannot exceed 500 characters"]
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    members: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        role: {
            type: String,
            enum: ['member', 'moderator', 'admin'],
            default: 'member'
        },
        joinedAt: {
            type: Date,
            default: Date.now
        }
    }],
    bannedUsers: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        reason: {
            type: String,
            trim: true
        },
        bannedAt: {
            type: Date,
            default: Date.now
        }
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }],
    isPrivate: {
        type: Boolean,
        default: false
    },
    rules: [{
        rule: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            trim: true
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware to update updatedAt timestamp
groupSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Custom methods

groupSchema.methods = {
    // Check if user is admin
    isAdmin(userId) {
        return this.admin.toString() === userId.toString();
    },

    // Check if user is moderator
    isModerator(userId) {
        return this.members.some(member => 
            member.user.toString() === userId.toString() && 
            member.role === 'moderator'
        );
    },

    // Check if user has admin or moderator permissions
    hasAdminPermissions(userId) {
        return this.isAdmin(userId) || this.isModerator(userId);
    },

    // Check if user is banned
    isBanned(userId) {
        return this.bannedUsers.some(banned => 
            banned.user.toString() === userId.toString()
        );
    },

    // Check if user is a member
    isMember(userId) {
        return this.members.some(member => 
            member.user.toString() === userId.toString()
        );
    }
};

const Group = mongoose.model("Group", groupSchema);
export default Group;
