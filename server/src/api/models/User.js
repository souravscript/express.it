import mongoose from "mongoose";


// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minlength: [3, "Name must be at least 3 characters long"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password must be at least 8 characters long"],
  },
  profilePic: {
    type: String,
    default: "https://winaero.com/blog/wp-content/uploads/2017/12/User-icon-256-blue.png",
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Compile and export the User model
const User = mongoose.model("User", userSchema);

export default User;
