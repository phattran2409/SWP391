const router = require("express").Router();
const commentController = require("../controller/commentController");

router.get("/:id", commentController.getCommentByPost); 
router.post("/createComment", commentController.createComment);
router.put("/updateComment/:id", commentController.updateComment);
router.delete("/deleteComment/:id", commentController.deleteComment);
router.post("/createReply/:id", commentController.createReply);
router.get("/getAllReply/:id", commentController.getAllReply);
router.put("/updateReply", commentController.updateReply);
router.delete("/deleteReply", commentController.deleteReply);
module.exports = router;