import Expression from '../models/Expression.js';
import { expressionQueue } from '../../config/queue.js';

class ExpressionService {
    async createExpression({ content, photos, authorId }) {
        try {
            const job = await expressionQueue.add('createExpression', {
                content,
                photos,
                authorId
            });
            return await job.wait();
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async getAllExpressions() {
        try {
            const expressions = await Expression.find()
                .populate('author', 'name email')
                .populate('reExpressions.author', 'name email')
                .populate('reExpressions.originalExpression', 'content author')
                .populate('comments.author', 'name email')
                .populate('reExpressions.comments.author', 'name email')
                .sort({ createdAt: -1 });
            return expressions;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async getExpressionsByID(authorId) {
        try {
            const expressions = await Expression.find({ author: authorId })
                .populate('author', 'name email')
                .populate('reExpressions.author', 'name email')
                .populate('reExpressions.originalExpression', 'content author')
                .populate('comments.author', 'name email')
                .populate('reExpressions.comments.author', 'name email')
                .sort({ createdAt: -1 });
            return expressions;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async getExpressionById(expressionId) {
        try {
            const expression = await Expression.findById(expressionId)
                .populate('author', 'name email')
                .populate('reExpressions.author', 'name email')
                .populate('reExpressions.originalExpression', 'content author')
                .populate('comments.author', 'name email')
                .populate('reExpressions.comments.author', 'name email');
            return expression;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async updateExpression(expressionId, updates) {
        try {
            const job = await expressionQueue.add('updateExpression', {
                expressionId,
                updates
            });
            return await job.wait();
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async deleteExpression(expressionId) {
        try {
            const job = await expressionQueue.add('deleteExpression', {
                expressionId
            });
            return await job.wait();
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async likeExpression(expressionId, userId) {
        try {
            const job = await expressionQueue.add('likeExpression', {
                expressionId,
                userId
            });
            return await job.wait();
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async unlikeExpression(expressionId, userId) {
        try {
            const job = await expressionQueue.add('unlikeExpression', {
                expressionId,
                userId
            });
            return await job.wait();
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async addComment(expressionId, content, authorId) {
        try {
            const expression = await Expression.findById(expressionId);
            const comment = {
                content,
                author: authorId,
                likes: 0,
                likedBy: []
            };
            expression.comments.push(comment);
            await expression.save();
            return expression;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async deleteComment(expressionId, commentId, authorId) {
        try {
            const expression = await Expression.findById(expressionId);
            const commentIndex = expression.comments.findIndex(c => c._id.toString() === commentId);
            if (commentIndex !== -1 && expression.comments[commentIndex].author.toString() === authorId) {
                expression.comments.splice(commentIndex, 1);
                await expression.save();
            }
            return expression;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async likeComment(expressionId, commentId, userId) {
        try {
            const expression = await Expression.findById(expressionId);
            const comment = expression.comments.id(commentId);
            if (!comment.likedBy.includes(userId)) {
                comment.likedBy.push(userId);
                comment.likes += 1;
                await expression.save();
            }
            return expression;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async unlikeComment(expressionId, commentId, userId) {
        try {
            const expression = await Expression.findById(expressionId);
            const comment = expression.comments.id(commentId);
            if (comment.likedBy.includes(userId)) {
                comment.likedBy.pull(userId);
                comment.likes -= 1;
                await expression.save();
            }
            return expression;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async createReExpression(originalExpressionId, content, authorId) {
        try {
            const originalExpression = await Expression.findById(originalExpressionId);
            if (!originalExpression) {
                throw new Error('Original expression not found');
            }

            const reExpression = {
                content,
                author: authorId,
                originalExpression: originalExpressionId,
                likes: 0,
                likedBy: [],
                comments: []
            };

            originalExpression.reExpressions.push(reExpression);
            await originalExpression.save();
            return originalExpression;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async deleteReExpression(expressionId, reExpressionId, authorId) {
        try {
            const expression = await Expression.findById(expressionId);
            const reExpressionIndex = expression.reExpressions.findIndex(re => re._id.toString() === reExpressionId);
            if (reExpressionIndex !== -1 && expression.reExpressions[reExpressionIndex].author.toString() === authorId) {
                expression.reExpressions.splice(reExpressionIndex, 1);
                await expression.save();
            }
            return expression;
        } catch (err) {
            throw new Error(err.message);
        }
    }
}

const expressionService = new ExpressionService();
export default expressionService;