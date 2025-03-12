import { UniqueNamesGenerator } from 'unique-names-generator';
import { v4 as uuidv4 } from 'uuid';
import { Avatar } from 'react-avatar';
import bcrypt from 'bcrypt';

// Initialize the unique names generator with various dictionaries
const uniqueNamesGenerator = new UniqueNamesGenerator({
    dictionaries: [
        'adjectives',
        'animals',
        'colors',
        'countries',
        'fantasy',
        'food',
        'games',
        'movies',
        'music',
        'nature',
        'planets',
        'professions',
        'space',
        'sports',
        'superheroes',
        'technology',
        'transport',
        'weather'
    ],
    style: 'lowerCase',
    separator: '',
    length: 2
});

export const generateRandomUsername = () => {
    // Generate a unique name from the dictionaries
    const baseName = uniqueNamesGenerator.generate();
    // Add a random number to ensure uniqueness
    const randomNumber = Math.floor(Math.random() * 1000000);
    
    return `${baseName}${randomNumber}`;
};

export const generateAvatar = (username) => {
    // Generate an avatar using react-avatar
    const avatar = new Avatar({
        name: username,
        size: 256,
        round: true,
        textSizeRatio: 2,
        color: Math.floor(Math.random() * 7), // Random color from the default palette
        backgroundColor: Math.floor(Math.random() * 7), // Random background color
        style: 'circle',
        className: 'avatar'
    });
    
    return avatar.toDataURL();
};

export const generateUniqueUsername = async (UserModel) => {
    let username;
    let isUnique = false;
    
    while (!isUnique) {
        username = generateRandomUsername();
        const existingUser = await UserModel.findOne({ username });
        isUnique = !existingUser;
    }
    
    return username;
};

export const createUserWithAvatar = async (UserModel, userData) => {
    try {
        // Generate a unique username
        const username = await generateUniqueUsername(UserModel);
        
        // Generate an avatar based on the username
        const avatar = generateAvatar(username);
        
        // Hash the password
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        
        // Create a new user with the generated username and avatar
        const newUser = new UserModel({ 
            email: userData.email, 
            password: hashedPassword, 
            name: userData.name,
            username,
            profilePic: avatar
        });
        
        const savedUser = await newUser.save();
        
        // Exclude sensitive fields
        const { password: _, ...userDetails } = savedUser.toObject();
        return userDetails;
    } catch (error) {
        throw new Error('Failed to create user with avatar');
    }
};
