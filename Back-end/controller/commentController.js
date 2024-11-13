const comments = require("../models/comment");

const commentController = {
  getCommentByPost: async (req, res) => {
    try {
      const postId = req.params.id;
      const result = await comments.find({ post: postId });
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  createComment: async (req, res) => {
    try {
      const { post, author, content } = req.body;
      const newComment = new comments({
        post,
        author,
        content,
      });
      const result = await newComment.save();
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  updateComment: async (req, res) => {
    try {
      const id = req.params.id;
      const updateData = req.body;
      const result = await comments.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true }
      );
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
        const id = req.params.id;
        const deleteComment = await comments.findByIdAndDelete(id);
        return res.status(200).json({ message: "delete success" });

    } catch (error) {
        return res.status(500).json(error);
    }
  }
};

module.exports = commentController;
