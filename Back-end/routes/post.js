const router = require("express").Router();
const middlewareController = require("../controller/middlewareController");
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

// Get post by elmentID 
router.get("/getPostByElementID/:id", postController.getPostByElemet);

//Delete Post
router.delete("/deletePost/:id", middlewareController.verifyTokenMember, postController.deletePost);

//Create Post
router.post( "/createPost",middlewareController.verifyTokenMember, postController.createPost);


//Upload Image
router.post("/uploadImage", upload.single("postArticle_Thumbnail"), postController.uploadImage);

//Get post by ID
router.get("/getPostById/:id", postController.getPostById);


//Update post
router.put("/updatePost/:id", middlewareController.verifyTokenAdminAuth, postController.updatePost);

//Update Post By Member
router.put("/updatePostByMember/:id", middlewareController.verifyTokenMember, postController.updatePostByMember);

//Search post
router.get("/searchPost", postController.searchPost);

//Set status
router.put("/setStatus/:id", middlewareController.verifyTokenAdminAuth, postController.setStatus);

router.get("/searchPage", postController.searchPostnotPagination);

router.get("/searchPostnotPagination", postController.searchPostnotPagination);

router.get("/getAllAd/:id", postController.getAllAd);



module.exports = router;
