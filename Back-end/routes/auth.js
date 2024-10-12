const  router  = require("express").Router();
const authController = require("../controller/authController");




router.post("/register", authController.registerUser);
router.post("/login" , authController.loginUser);

router.post("/refresh" , authController.reqRefreshToken);
router.post("/logout" , authController.logout);

// Route gửi email reset password
router.post("/reset-password", authController.sendResetPasswordEmail);

// Route để đặt lại mật khẩu với token
router.post("/reset-password/:token", authController.resetPassword);
module.exports = router;