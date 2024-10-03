const posts = require("../models/post");

const postController = {
  //Get all post and author
  getAllPost: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 2;

      const skip = (page - 1) * limit;

      const allPost = await posts
        .find()
        .populate("author")
        .skip(skip)
        .limit(limit);

      const totalDocuments = await posts.countDocuments();
      res.status(200).json({
        currentPage: page,
        totalPages: Math.ceil(totalDocuments / limit),
        totalDocuments: totalDocuments,
        data: allPost,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  //Get all posts written by a user
  getPostByAuthor: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 2;

      const skip = (page - 1) * limit;

      const postByUser = await posts
        .find({ author: req.params.id })
        .populate("author")
        .skip(skip)
        .limit(limit);
        const totalDocuments = await posts.countDocuments();
      res.status(200).json({
        currentPage: page,
        totalPages: Math.ceil(totalDocuments / limit),
        totalDocuments: totalDocuments,
        data: postByUser,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  //Delete Post
  deletePost: async (req, res) => {
    try {
      const deletedPost = await posts.findByIdAndDelete(req.params.id);
      res.status(200).json(deletedPost);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  //Create new post
  createPost: async (req, res) => {
    try {
      const newPost = new posts(req.body);
      const post = await newPost.save();
      res.status(200).json(post);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  //Update post
  updatePost: async (req, res) => {
    try {
      const updatePost = await posts.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true, runValidators: true }
      );
      res.status(200).json(updatePost);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  //Search post
  searchPost: async (req, res) => {
    const {
      title,
      elementID,
      sortBy = "elementID", // Field to sort by
      sortOrder = "asc", // 'asc' or 'desc'
    } = req.query;
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 2;
      const skip = (page - 1) * limit;
      const filter = {};

      if (title) {
        filter.title = { $regex: title, $options: "i" };
      }

      if (elementID) {
        filter.elementID = elementID;
      }

      const sortOrderValue = sortOrder === "asc" ? 1 : -1;
      const postList = await posts
        .find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ [sortBy]: sortOrderValue })
        .exec();
      const totalDocuments = await posts.countDocuments(filter);
      return res.status(200).json({
        currentPage: page,
        totalPages: Math.ceil(totalDocuments / limit),
        totalDocuments: totalDocuments,
        data: postList,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = postController;
