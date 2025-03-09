import Expression from '../models/Expression.js';

class ExpressionService {
    async createExpression({ content, photos, authorId }) {
        try {
            const newExpression = await Expression.create({ content, photos, author: authorId });
            return newExpression;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async getAllExpressions() {
        try {
            const expressions = await Expression.find()
                .populate('author', 'name email')
                .populate('reExpressions.author', 'name email')
                .sort({ createdAt: -1 });
            return expressions;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async getExpressionsByID(author) {
        try {
            const expressions = await Expression.find({ author: author.authorId })
                .populate('author', 'name email')
                .populate('reExpressions.author', 'name email')
                .sort({ createdAt: -1 });
            return expressions;
        } catch (err) {
            throw new Error(err.message);
        }
    }
}

// Removed unused handleError import
const expressionServiceInstance = new ExpressionService();
export default expressionServiceInstance;