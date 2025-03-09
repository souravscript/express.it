import UserService from '../services/userService.js';
import { handleError } from '../../utils/errorHandler.js';
import { validateUserRegistration } from '../../middlewares/validate.js';
import { validationResult } from 'express-validator';
import asyncHandler from '../../utils/asyncHandler.js';

const userService = new UserService();

export const register = asyncHandler(async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password, name } = req.body;
        const result = await userService.registerUser({ email, password, name });
        res.status(201).json({ message: "User registered successfully", result: result });
    } catch (err) {
        handleError(res, err);
    }
});

  
export const login = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body; 
        const { userDetails, token } = await userService.loginUser(email, password);
        res.status(200).json({
            message: "User logged in successfully", 
            userDetails: userDetails,
            token: token
        });
    } catch (err) {
        handleError(res, err);
    }
});
