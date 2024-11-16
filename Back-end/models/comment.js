
const { default: mongoose } = require("mongoose");

// import mongoose from 'mongoose';

const replySchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    content: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);

const commentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    content: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 500,
    },
    replies: [replySchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("comments", commentSchema);
