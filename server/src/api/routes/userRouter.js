import express from "express"
import { login, register, updateProfile } from "../controllers/userController.js"
import multer from 'multer';
import path from 'path';
import { validate, userRegistrationSchema, userProfileUpdateSchema } from "../middlewares/zodValidation.js";

/**
 * @swagger
 * tags:
 *   name: User
 *   description: API for user management
 */

const router=express.Router()

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/profile-pictures');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        }
        cb(new Error('Only images are allowed!'));
    }
});

/**
 * @swagger
 * /register:
 *   post:
 *     tags: [User]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 description: The password of the user
 *                 example: "password123"
 *               name:
 *                 type: string
 *                 description: The name of the user
 *                 example: "John Doe"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */
router.post("/register", validate(userRegistrationSchema), register)

/**
 * @swagger
 * /login:
 *   post:
 *     tags: [User]
 *     summary: Log in an existing user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 description: The password of the user
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/login", login) 

/**
 * @swagger
 * /profile:
 *   patch:
 *     tags: [User]
 *     summary: Update user profile
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user
 *                 example: "John Doe"
 *               bio:
 *                 type: string
 *                 description: The bio of the user
 *                 example: "Software Developer"
 *               website:
 *                 type: string
 *                 description: The website of the user
 *                 example: "https://john.com"
 *               location:
 *                 type: string
 *                 description: The location of the user
 *                 example: "New York"
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Invalid input
 */
router.patch("/profile", validate(userProfileUpdateSchema), updateProfile)

/**
 * @swagger
 * /profile/picture:
 *   patch:
 *     tags: [User]
 *     summary: Update user profile picture
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePic:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile picture updated successfully
 *       400:
 *         description: Invalid input
 */
router.patch("/profile/picture", upload.single('profilePic'), updateProfile)

export default router