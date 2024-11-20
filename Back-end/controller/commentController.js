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
  },

  createReply : async (req, res) => {
    try {
      const commentId = req.params.id;
      const { author, content} = req.body;
      const comment = await comments.findById(commentId);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      const newReply = {author, content};
      comment.replies.push(newReply);
      await comment.save();
      return res.status(200).json(newReply);

    } catch (error) {
      return res.status(500).json(error);
    }
  },

  getAllReply : async (req, res) => {
    try {
      const commentId = req.params.id;
      const comment = await comments.findById(commentId).populate("replies.author");
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      return res.status(200).json(comment.replies);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  updateReply : async (req, res) => {
    try {
      const commentId = req.query.commentId;
      const replyId  = req.query.replyId;
      const content = req.body.content;
      const updateReply = await comments.findOneAndUpdate(
        { _id: commentId, "replies._id": replyId },
        { $set: { "replies.$.content": content } },
        { new: true }
      );
      if (!updateReply) {
        return res.status(404).json({ message: "Comment or reply not found" });
      }
      return res.status(200).json("Reply updated successfully");
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  deleteReply : async (req, res) => {
    try {
      const commentId = req.query.commentId;
      const replyId = req.query.replyId;
      const deleteReply = await comments.findOneAndUpdate(
        { _id: commentId },
        {$pull: {replies: {_id: replyId}}},
        {new: true}
      )
      if (!deleteReply) {
        return res.status(404).json({ message: "Comment or reply not found" });
      }
      return res.status(200).json("Reply deleted successfully");
    } catch (error) {
      return res.status(500).json(error);
    }
  }
};


module.exports = commentController;
