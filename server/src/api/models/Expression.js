import mongoose from "mongoose";

const reExpressionSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      maxlength: [280, "Content cannot exceed 280 characters"],
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User schema
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const expressionSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      maxlength: [280, "Content cannot exceed 280 characters"],
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User schema
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    photos: [
      {
        type: String,
      },
    ],
    reExpressions: [reExpressionSchema], // Sub-schema for nested reExpressions
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Expression = mongoose.model("Expression", expressionSchema);

export default Expression;
