import { body, validationResult } from 'express-validator';

export const validateUserRegistration = [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('name').notEmpty().withMessage('Name is required'),
];

export const validateExpressionCreation = [
    body('content').notEmpty().withMessage('Content is required'),
];
