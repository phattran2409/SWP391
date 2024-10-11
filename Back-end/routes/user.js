const router = require("express").Router();
const middlewareController = require("../controller/middlewareController");
const useController = require("../controller/userController");
const upload = require("../middleware/multer");
const uploads = require("../middleware/multerConfig");
const jwt = require("jsonwebtoken");
// GET all USER
//  /v1/user/all
router.get(
  "/",
  middlewareController.verifyTokenAdminAuth,
  useController.getAllUsr
);
//  GET BY ID
// /v1/user/id=
router.get("/id=:id", useController.getUserById);
// DELETE by ID
// /v1/user/id=
router.delete(
  "/id=:id",
  middlewareController.verifyTokenAdminAuth,
  useController.deleteUser
);
router.post(
  "/create",
  middlewareController.verifyTokenAdminAuth,
  useController.createUser
);
//  UPDATE by ID
// /v1/user/id=
router.put(
  "/update/id=:id",
  middlewareController.verifyTokenAdminAuth,
  useController.updateUser
);
// SUBCRIBE  Membership
// /v1/user/subcribe
router.post(
  "/subcribe",
  middlewareController.verifyToken,
  useController.subcribeMemberShip
);
// Search
router.get(
  "/search",
  middlewareController.verifyTokenAdminAuth,
  useController.search
);

// upload Image
router.post("/uploadImage", upload.single("avatar"), useController.uploadImage);

router.post("/uploadImages", uploads.array("post"), useController.uploadImages);


//change password
router.post(
  "/updatePassword",
  middlewareController.verifyToken,
  useController.updatePassword
);


//change email
router.post(
  "/send-change-email",
  middlewareController.verifyToken,
  useController.sendChangeEmail
);
router.get("/send-change-email/:token", (req, res) => {
  const { token } = req.params;

  jwt.verify(token, process.env.JWT_CHANGE_EMAIL_KEY, (err, decoded) => {
    if (err) {
      return res.status(400).json("Invalid or expired token");
    }

    res.redirect(`http://localhost:5173/changeEmail?token=${token}`);
  });
});
router.post("/confirmEmail", useController.confirmChangeEmail);
module.exports = router;
