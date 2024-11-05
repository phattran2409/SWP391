const router = require("express").Router();
const authController = require("../controller/authController");


const jwt = require("jsonwebtoken");

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/refresh", authController.reqRefreshToken);
router.post("/logout", authController.logout);


// Route gửi email reset password
router.post("/reset-password", authController.sendResetPasswordEmail);
// Route để xác nhận token và chuyển hướng người dùng đến trang đặt lại mật khẩu
router.get("/reset-password/:token", (req, res) => {
  const { token } = req.params;

  jwt.verify(token, process.env.JWT_RESET_PASSWORD_KEY, (err, decoded) => {
    if (err) {
      return res.status(400).json("Invalid or expired token");
    }

    res.redirect(`http://localhost:5173/reset?token=${token}`);
  });
});
// // Route để đặt lại mật khẩu với token
router.post("/resetNewPass", authController.resetPassword);


module.exports = router;
