const posts = require("../models/post");
const cloudinary = require("../config/cloudinary");
const upload = require("../middleware/multerConfig");
const { UploadStream } = require("cloudinary");
const fs = require('fs').promises; // Use promises for cleaner async code




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

uploadImages : async (req ,res ) => {
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
    console.log(" RESULT AFTER UPLOAD  CLOUDINARY  : "+ results);
    
    // lam trong thu muc upload sau khi  được upload lên cloud
       req.files.forEach((file) => {
         fs.unlink(file.path, (err) => {
           if (err) {
             console.error("Error deleting file:", err);
           }
         });
       });
 
     const urls = results.map((result) => result.secure_url);
    
    return res.status(200).json(
      {
        success : true, 
        data : urls
      }
    )
   
  }catch (err) {
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
