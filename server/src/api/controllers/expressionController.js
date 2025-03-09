import { handleError } from '../../utils/errorHandler.js';
import { validateExpressionCreation } from '../../middlewares/validate.js';
import { validationResult } from 'express-validator';
import asyncHandler from '../../utils/asyncHandler.js';
import ExpressionService from '../services/expressionService.js';

const expressionService = new ExpressionService();

export const createExpression = asyncHandler(async (req, res) => {
    try {
        const { content, photos } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const authorId = req.user.id;
        const newExpression = await expressionService.createExpression({ content, photos, authorId });
        res.status(201).json({ message: "Post created successfully", expression: newExpression });
    } catch (err) {
        handleError(res, err);
    }
});

export const getAllExpressionController = asyncHandler(async (req, res) => {
    try {
        const allExpression = await expressionService.getAllExpressions();
        res.status(200).json({ message: "All expressions fetched", expressions: allExpression });
    } catch (err) {
        handleError(res, err);
    }
});

export const getOwnExpressionsController = asyncHandler(async (req, res) => {
    try {
        const authorId = req.user.id;
        const ownExpressions = await expressionService.getExpressionsByID({ authorId });
        res.status(200).json({ message: "Fetched all my expressions", ownExpressions: ownExpressions });
    } catch (err) {
        handleError(res, err);
    }
});

export const getOthersExpressionController = asyncHandler(async (req, res) => {
    try {
        console.log("trying to fetch req.params", req.params);
        const { id, authorId } = req.params; // Assuming authorId is part of the params
        const othersExpressions = await expressionService.getExpressionsByID({ authorId });
        res.status(200).json({ message: `Fetched all others expressions of ${authorId}`, expressions: othersExpressions });
    } catch (err) {
        handleError(res, err);
    }
});