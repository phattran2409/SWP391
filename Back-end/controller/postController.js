const posts = require("../models/post");
const cloudinary = require("../config/cloudinary");
const upload = require("../middleware/multerConfig");
const { UploadStream } = require("cloudinary");
const { set } = require("mongoose");
const fs = require("fs").promises; // Use promises for cleaner async code
const users = require("../models/user");
const { log } = require("console");

const postController = {
  //Get all post and author
  getPostById: async (req, res) => {
    try {
      const post = await posts.findById(req.params.id).populate("author");
      res.status(200).json(post);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  getPostByElemet : async(req , res) => {
    try {
      const post = await posts
        .find({
          elementID: parseInt(req.params.id),
          categoryID:  parseInt(req.query.categoryID),
        })
        .populate("author");

      if (post) {
        return res.status(200).json({data : post}); 
      }   

      return res.status(406).json("Not found")
    } catch (error) {
      return res.status(500).json(error)
    }
  },

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
      const news = await posts.countDocuments({ categoryID: 1 });
      const blog = await posts.countDocuments({ categoryID: 2 });
      const ads = await posts.countDocuments({ categoryID: 3 });
      res.status(200).json({
        currentPage: page,
        totalPages: Math.ceil(totalDocuments / limit),
        totalDocuments: totalDocuments,
        data: allPost,
        news: news,
        blog: blog,
        ads: ads,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  //Get all posts written by a user
  getPostByAuthor: async (req, res) => {
    try { 
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;

      const skip = (page - 1) * limit;

      const postByUser = await posts
        .find({ author: req.params.id })
        .populate("author")
        .skip(skip)
        .sort({ updatedAt: -1 })
        .limit(limit);
      const totalDocuments = await posts.countDocuments({ author: req.params.id });
      console.log("length"+postByUser.length);
      res.status(200).json({
        currentPage: page,
        totalPages: Math.ceil(totalDocuments/ limit),
        totalDocuments: totalDocuments, 
        data: postByUser,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  getPostByCategory: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;

      const skip = (page - 1) * limit;

      const postByCategory = await posts
        .find({ categoryID: req.params.id })
        .populate("author")
        .skip(skip)
        .sort({ updatedAt: -1 })
        .limit(limit);
      const totalDocuments = await posts.countDocuments({
        categoryID: req.params.id,
      });
      res.status(200).json({
        currentPage: page,
        totalPages: Math.ceil(totalDocuments / limit),
        totalDocuments: totalDocuments,
        data: postByCategory,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  getApprovedPost: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;

      const skip = (page - 1) * limit;

      const postByCategory = await posts
        .find({ categoryID: req.params.id, postStatus: "true" })
        .populate("author")
        .skip(skip)
        .sort({ updatedAt: -1 })
        .limit(limit);
      const totalDocuments = await posts.countDocuments({
        categoryID: req.params.id,
        postStatus: "true",
      });
      res.status(200).json({
        currentPage: page,
        totalPages: Math.ceil(totalDocuments / limit),
        totalDocuments: totalDocuments,
        data: postByCategory,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  updatePostByMember: async (req, res) => {
    try {
      const updateData = { ...req.body, postStatus: false };

      const updatePost = await posts.findByIdAndUpdate(
          req.params.id,
          { $set: updateData },
          { new: true, runValidators: true }
      );

      return res.status(200).json(updatePost);
  } catch (error) {
      return res.status(500).json(error);
  }
  },

  //setStatus
  setStatus: async (req, res) => {
    try {
      const status = req.body.postStatus;
      const id = req.params.id;
      const updateStatus = await posts.findByIdAndUpdate(
        id,
        { postStatus: status },
        { new: true, runValidators: true }
      ).populate("author");
      console.log(updateStatus);

      if (status === true) {
        const newnotification = {
          content: `Your post "${updateStatus.title}" has been approved by admin`,
          status: true,
        };
        const userUpdateMemberStatus = await users.findByIdAndUpdate(
          updateStatus.author._id,
          { $push: { notification: newnotification } },
          { new: true, runValidators: true }
        );

        console.log(userUpdateMemberStatus);
      }
      else{
        const newnotification = {
          content: `Your post "${updateStatus.title}" has been rejected by admin`,
          status: true,
        };
        const userUpdateMemberStatus = await users.findByIdAndUpdate(
          updateStatus.author._id,
          { $push: { notification: newnotification } },
          { new: true, runValidators: true }
        );

        console.log(userUpdateMemberStatus);
      }

      res.status(200).json(updateStatus);
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

  // Create a new post
  createPost: async (req, res) => {
    try {
      const newPost = new posts(req.body);
      const savePost = await newPost.save();
      res.status(200).json(savePost);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  uploadImages: async (req, res) => {
    try {
      console.log(req.files);
      // kiem tra xem các file có được upload
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No files uploaded",
        });
      }
      //

      const uploadPromises = req.files.map((file) => {
        return cloudinary.uploader.upload(file.path, {
          folder: "postArticle_photos",
        });
      });

      const results = await Promise.all(uploadPromises);
      console.log(" RESULT AFTER UPLOAD  CLOUDINARY  : " + results);

      // lam trong thu muc upload sau khi  được upload lên cloud
      req.files.forEach((file) => {
        fs.unlink(file.path, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
          }
        });
      });

      const urls = results.map((result) => result.secure_url);

      return res.status(200).json({
        success: true,
        data: urls,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "An error occurred while uploading the images",
      });
    }
  },

  uploadImage: async (req, res) => {
    console.log(req.file);
    cloudinary.uploader.upload(
      req.file.path,
      { folder: "postArticle_Thumbnail" },
      function (err, result) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: "Error",
          });
        }

        return res.status(200).json({ data: result.secure_url });
      }
    );
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

  searchPostnotPagination: async (req, res) => {
    const {
      title,
      elementID,
      categoryID,
      postStatus,
      sortBy = "elementID", // Field to sort by
      sortOrder = "asc", // 'asc' or 'desc'
    } = req.query;
    try {
      const filter = {};

      if (categoryID) {
        filter.categoryID = categoryID;
      }

      if (title) {
        filter.title = { $regex: title, $options: "i" };
      }

      if (elementID) {
        filter.elementID = elementID;
      }
      if (postStatus) {
        filter.postStatus = postStatus;
      }

      const sortOrderValue = sortOrder === "asc" ? 1 : -1;
      const postList = await posts
        .find(filter)
        .populate("author")

        .sort({ [sortBy]: sortOrderValue })
        .exec();
      const totalDocuments = await posts.countDocuments(filter);
      return res.status(200).json({
        totalDocuments: totalDocuments,
        data: postList,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  //Search post
  searchPost: async (req, res) => {
    const {
      title,
      elementID,
      categoryID,
      postStatus,
      author,
      sortBy = "elementID", // Trường để sắp xếp chính
      sortOrder = "asc", // 'asc' hoặc 'desc'
    } = req.query;

    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 2;
      const skip = (page - 1) * limit;
      const filter = {};

      if (categoryID) {
        filter.categoryID = categoryID;
      }

      if (title) {
        filter.title = { $regex: title, $options: "i" };
      }
      if (author) {
        filter.author = author;
      }

      if (elementID) {
        filter.elementID = elementID;
      }

      if (postStatus) {
        filter.postStatus = postStatus;
      }

      const sortOrderValue = sortOrder === "asc" ? 1 : -1;

      // Xây dựng đối tượng sắp xếp với cả sortBy và postStatus
      const sortCriteria = {
        [sortBy]: sortOrderValue,
        postStatus: sortOrderValue, // Thêm postStatus vào tiêu chí sắp xếp
      };

      const postList = await posts
        .find(filter)
        .populate("author")
        .skip(skip)
        .limit(limit)
        .sort(sortCriteria) // Sử dụng đối tượng sắp xếp đã xây dựng
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

  getAllAd: async (req, res) => {
    try {
      const postByCategory = await posts
        .find({ categoryID: req.params.id, postStatus: "true" })
        .populate("author");

      const totalDocuments = postByCategory.length; // Tổng số tài liệu sẽ là chiều dài của mảng

      res.status(200).json({
        totalDocuments: totalDocuments,
        data: postByCategory,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  // uploadImage: async (req, res) => {
  //   console.log(req.file);
  //   cloudinary.uploader.upload(
  //     req.file.path,
  //     { folder: "avatar" },
  //     function (err, result) {
  //       if (err) {
  //         console.log(err);
  //         return res.status(500).json({
  //           success: false,
  //           message: "Error",
  //         });
  //       }

  //       return res.status(200).json({ data: result.secure_url });
  //     }
  //   );
  // },
};

module.exports = postController;
