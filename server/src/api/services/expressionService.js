import { handleError } from '../../utils/errorHandler.js';
import Expression from '../models/Expression.js';

export const createExpressionService = async ({ content, photos, authorId }) => {
    try {
        const newExpression = await Expression.create({ content, photos, author: authorId });
        return newExpression;
    } catch (err) {
        handleError(err);
    }
};

export const getAllExpressionsService = async () => {
    try {
        const expressions = await Expression.find()
            .populate("author", "name email")
            .populate("reExpressions.author", "name email")
            .sort({ createdAt: -1 });
        return expressions;
    } catch (err) {
        handleError(err);
    }
};

export const getExpressionsByIDService = async (author) => {
    try {
        console.log("author user id  in the service", author.authorId)
        const expressions = Expression.find({ author: author.authorId })
            .populate("author", "name email")
            .populate("reExpressions.author", "name email")
            .sort({ createdAt: -1 });
        return expressions
    } catch (err) {
        handleError(err);
    }
};