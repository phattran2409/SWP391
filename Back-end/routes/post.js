const router = require("express").Router();
const postController = require("../controller/postController");
const middlewareController = require("../controller/middlewareController");
const upload = require("../middleware/multerConfig");
//Get all post and author
router.get("/getAllPost", postController.getAllPost);

//Get all posts written by a user
router.get("/getPostByAuthor/:id", postController.getPostByAuthor);

//Delete Post
router.delete("/deletePost/:id", postController.deletePost);

//Create new post
// router.post('/createPost',  postController.createPost);
// router.post('/createPost', upload.fields([{ name: 'file' }, { name: 'files' }]), postController.createPost);


router.post( "/createPost",  postController.createPost);

router.post("/uploadImages", upload.array("postArticle_photos"), postController.uploadImages);

router.post("/uploadImage", upload.single("postArticle_Thumbnail"), postController.uploadImage);


//Update post
router.put("/updatePost/:id", postController.updatePost);

//Search post
router.get("/searchPost", postController.searchPost);

module.exports = router;
