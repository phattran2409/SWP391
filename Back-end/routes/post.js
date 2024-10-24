const router = require("express").Router();
const postController = require("../controller/postController");
const upload = require("../middleware/multerConfig");
//Get all post and author
router.get("/getAllPost", postController.getAllPost);

//Get all posts written by a user
router.get("/getPostByAuthor/:id", postController.getPostByAuthor);

//Get all posts by category
router.get("/getPostByCategory/:id", postController.getPostByCategory);

//Get approved post by category
router.get("/getPost/:id", postController.getApprovedPost);


//Delete Post
router.delete("/deletePost/:id", postController.deletePost);

//Create Post
router.post( "/createPost",  postController.createPost);

//Upload Image
router.post("/uploadImage", upload.single("postArticle_Thumbnail"), postController.uploadImage);

//Get post by ID
router.get("/getPostById/:id", postController.getPostById);

//Update post
router.put("/updatePost/:id", postController.updatePost);

//Search post
router.get("/searchPost", postController.searchPost);

//Set status
router.put("/setStatus/:id", postController.setStatus);

router.get("/searchPage", postController.searchPostnotPagination);

module.exports = router;
