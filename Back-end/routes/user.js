const router  = require("express").Router();
const middlewareController = require("../controller/middlewareController");
const useController = require("../controller/userController")

// GET all USER
router.get("/all",middlewareController.verifyToken, useController.getAllUsr);
//  GET BY ID 
router.get("/id=:id" ,useController.getUserById);
// DELETE by ID
router.delete("/id=:id" ,middlewareController.verifyTokenAdminAuth ,  useController.deleteUser);
//  UPDATE by ID 
router.post ("/update/id=:id" ,middlewareController.verifyTokenAdminAuth,useController.updateUser); 
// SUBCRIBE  Membership
router.post("/subcribe" , useController.subcribeMemberShip);

module.exports = router;