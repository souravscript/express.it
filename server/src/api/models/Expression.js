import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    maxlength: [500, "Comment cannot exceed 500 characters"],
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
});

const reExpressionSchema = new mongoose.Schema({
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
  originalExpression: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Expression",
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
  comments: [commentSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const expressionSchema = new mongoose.Schema({
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
  photos: [
    {
      type: String,
    },
  ],
  comments: [commentSchema],
  reExpressions: [reExpressionSchema],
}, {
  timestamps: true,
});

const Expression = mongoose.model("Expression", expressionSchema);

export default Expression;
