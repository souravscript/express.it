import { z } from 'zod';

// User registration schema
export const userRegistrationSchema = z.object({
    email: z.string().email('Please provide a valid email'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    name: z.string().min(1, 'Name is required'),
});

// Expression creation schema
export const expressionCreationSchema = z.object({
    content: z.string().min(1, 'Content is required'),
    photos: z.array(z.string()).optional(),
    authorId: z.string().optional(),
});

// User profile update schema
export const userProfileUpdateSchema = z.object({
    name: z.string().min(1, 'Name is required').optional(),
    bio: z.string().max(160, 'Bio must be less than 160 characters').optional(),
    website: z.string().url('Please provide a valid URL').optional(),
    location: z.string().max(50, 'Location must be less than 50 characters').optional(),
});

// Post creation schema
export const postCreationSchema = z.object({
    content: z.string().min(1, 'Content is required'),
    images: z.array(z.string()).optional(),
    authorId: z.string().optional(),
});

// Comment creation schema
export const commentCreationSchema = z.object({
    content: z.string().min(1, 'Content is required'),
    authorId: z.string().optional(),
});

// Like/unlike schema
export const likeSchema = z.object({
    userId: z.string(),
});

// Middleware to validate request body
export const validate = (schema) => {
    return async (req, res, next) => {
        try {
            const validatedData = await schema.parseAsync(req.body);
            req.body = validatedData;
            next();
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.errors[0].message,
            });
        }
    };
};
