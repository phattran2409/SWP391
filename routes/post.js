const router = require("express").Router();
const postController = require("../controller/postController");
const middlewareController = require("../controller/middlewareController");

//Get all post and author
router.get('/getAllPost',  postController.getAllPost);

//Get all posts written by a user
router.get('/getPostByAuthor/:id', postController.getPostByAuthor);


//Delete Post
router.delete('/deletePost/:id', postController.deletePost);

//Create new post
router.post('/createPost',  postController.createPost);

//Update post
router.put('/updatePost/:id',  postController.updatePost);

//Search post
router.get('/searchPost', postController.searchPost );


module.exports = router;