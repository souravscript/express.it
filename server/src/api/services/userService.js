import { generateToken } from '../helpers/generateToken.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { handleError } from '../../utils/errorHandler.js';
import { generateAvatar, generateUniqueUsername } from '../../utils/randomUsernameGenerator.js';
import multer from 'multer';
import path from 'path';

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

class UserService {
    async registerUser({ email, password, name }) {
        try {
            // Check if the user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error('User already exists with this email');
            }

            // Generate a unique username
            const username = await generateUniqueUsername(User);

            // Generate an avatar
            const avatar = generateAvatar(username);

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user with the generated username and avatar
            const newUser = new User({ 
                email, 
                password: hashedPassword, 
                name,
                username,
                profilePic: avatar
            });
            const savedUser = await newUser.save();

            // Exclude sensitive fields
            const { password: _, ...userDetails } = savedUser.toObject();
            return userDetails;
        } catch (err) {
            handleError(err);
        }
    }

    async updateUserProfile(userId, updates, file) {
        try {
            let profilePic = updates.profilePic;
            
            // If a new profile picture is uploaded
            if (file && file.path) {
                profilePic = `/uploads/profile-pictures/${path.basename(file.path)}`;
            }

            const updatedUser = await User.findByIdAndUpdate(
                userId,
                {
                    ...updates,
                    profilePic
                },
                { new: true }
            ).populate('author', 'name email');

            return updatedUser;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async loginUser(email, password) {
        try {
            // Find the user by email
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('Invalid email or password');
            }

            // Compare the provided password with the stored hashed password
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) {
                throw new Error('Invalid email or password');
            }
            const token=generateToken(user)
            // Return user details (excluding sensitive fields)
            const { password: _, ...userDetails } = user.toObject();
            return {userDetails,token};
        } catch (err) {
            handleError(err);
        }
    }
}

const userService=new UserService()
export default userService;
