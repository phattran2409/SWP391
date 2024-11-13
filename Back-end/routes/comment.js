const router = require("express").Router();
const commentController = require("../controller/commentController");

router.get("/:id", commentController.getCommentByPost); 
router.post("/createComment", commentController.createComment);
router.put("/updateComment/:id", commentController.updateComment);
router.delete("/deleteComment/:id", commentController.deleteComment);

module.exports = router;