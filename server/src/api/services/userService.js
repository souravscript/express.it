import { generateToken } from "../helpers/generateToken.js";
import User from "../models/User.js";
import bcrypt from 'bcrypt'


export const registerUser = async ({ email, password, name }) => {
  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists with this email');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = new User({ email, password: hashedPassword, name });
  const savedUser = await newUser.save();

  // Exclude sensitive fields
  const { password: _, ...userDetails } = savedUser.toObject();
  return userDetails;
};


export const loginUser = async (email, password) => {
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
};

