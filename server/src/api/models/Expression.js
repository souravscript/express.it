import mongoose from "mongoose";

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
    reExpressions: [
      {
        content: {
          type: String,
          required: true,
          maxlength: [280, "Content cannot exceed 280 characters"],
          trim: true,
        },
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
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
        reExpressions: [this], // Recursive embedding for deeper reExpressions
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

const Expression = mongoose.model("Expression", expressionSchema);

export default Expression;