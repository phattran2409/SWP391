const { json } = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//npm install nodemailer
const nodemailer = require("nodemailer");

const authController = {
  accessToken: (user) => {
    return jwt.sign(
      { id: user.id, admin: user.admin, memberStatus: user.memberStatus },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "1d" }
    );
  },
  refreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
        memberStatus: user.memberStatus,
      },
      process.env.JWT_REFRESH_KEY,
      {
        expiresIn: "2d",
      }
    );
  },

  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      console.log(req.body);
      
      const gender = Number.parseInt(req.body.gender);
      // create  a new user
      const newUser = await new User({
        userName: req.body.userName,
        email: req.body.email,
        password: hashed,
        avatar: "",
        birthDate: req.body.birthDate,
        gender: gender,
        phoneNumber: req.body.phone,
        name: req.body.name,
        elementID : req.body.elementID
      });
      console.log(newUser);
      
      // save to database
      const user = await newUser.save();
      console.log(user);

      // Send Email
        const transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        // Gửi email xác nhận
        const mailOptions = {
          to: req.body.email,
          subject: "Register Succesfully",
          html: `
      
          <p>Thank You Visiting Feng Shui Koi Consultant</p>
          <P>You Can visit Website Now <a href="fengshuikoi.online">Feng shui koi</a></p>
        `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return res.status(500).json(error);
          }
         return res.status(200).json("Resgister Successfully Email Sent." , user );
        });
      
      res.status(200).json(user);
    } catch (error) {
      // if (error.message)
      console.log( typeof error.message);
      if (error.message.includes("E11000")) {
       return res.status(500).json({message: "Email is exist or User Name exist !" , messageDetail: error.message} );
      }
        res.status(500).json({ message: error.message });
      console.log(error.message);
      
    }
  },

  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ userName: req.body.userName });

      console.log("userName" + req.body.userName);
      console.log(user);

      if (!user) {
        return res.status(401).json("Wrong UserName");
      }
      const ValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!ValidPassword) {
        return res.status(401).json("wrong password");
      }

      if (user && ValidPassword) {
        // create JWT
        const accessToken = authController.accessToken(user);
        const refreshToken = authController.refreshToken(user);

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          maxAge: 3600000, // ms (miliseconds)
          path: "/",
          sameSite: "strict",
        });
        //  ko show password cua user tuy da dc HASH r
        //  lay toan bo ngoai tru password
        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken , refreshToken});
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  reqRefreshToken: async (req, res) => {
    // lay cookies tu req
    // console.log(req.cookies.refreshToken);
    console.log("refresh token"+req.headers.authorization);
    console.log("Cookies Token  from localhost : " + req.headers.refreshtoken);
    const refreshToken = req.headers.refreshtoken;
    // req.headers.token || req.headers.authorization;

    //
    if (!refreshToken) return res.status(404).json("you're not authenticated");
    // if (!refreshTokensArr.includes(refreshToken)) return res.sendStatus(403);

    //  verify refreshToken
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, async (err, user) => {
      if (err) return res.status(403).json("Invalid refresh token");
      console.log("create new token");
      const newAccessToken = authController.accessToken(user);
      const newRefreshToken = authController.refreshToken(user);
      console.log("NEW ACCESS TOKEN : "+newAccessToken);
      if (err) {
        res.status(500).json(err.message)
      }
      // xoa di token cu va add newRefreshToken
      // refreshTokensArr = refreshTokensArr.filter((token) => refreshToken !== token )

      // const result = await refreshTokens.deleteOne({ token: refreshToken });

      // if (result.deletedCount === 1) {
      //   console.log("Token deleted successfully");
      // } else {
      //   console.log("Token not found or not deleted");
      // }
      // const newRefreshTokenDB = new refreshTokens({
      //   token: newRefreshToken,
      // });

      // newRefreshTokenDB.save();

      // refreshTokensArr.push(newRefreshToken);

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        maxAge: 3600000, // ms (miliseconds)a
        path: "/",
        sameSite: "strict",
      });

      res.status(200).json({ accessToken: newAccessToken });
    });
  },

  //Logout
  logout: async (req, res) => {
    const token = req.headers.token;
    if (!token) {
      return res.status(400).json({ message: "No token provideds" });
    }
  },

  sendResetPasswordEmail: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json("User not found");
      }

      // Tạo JWT Token cho việc reset password
      const resetToken = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_RESET_PASSWORD_KEY,
        { expiresIn: "15m" } // Token sống trong 15 phút
      );

      // Cấu hình Nodemailer để gửi email
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USER, // Email của bạn
          pass: process.env.EMAIL_PASS, // Mật khẩu của bạn
        },
      });

      // Gửi email reset password
      const mailOptions = {
        to: user.email,
        subject: "Reset Password",
        html:
          `<p>You requested a password reset. Click the link below to reset your password:</p>` +
          `<p><a href="http://localhost:${process.env.PORT}/v1/auth/reset-password/${resetToken}">Click Here To Reset Your Password</a></p>` +
          `<p>This link will expire in 15 minutes. If you didn't request a reset, please ignore this email.</p>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json(error);
        }
        res.status(200).json("Reset password email sent");
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Phương thức reset password
  resetPassword: async (req, res) => {
    try {
      // Lấy token từ params hoặc từ request body
      const resetToken = req.params.token || req.body.token;

      // Xác thực token
      jwt.verify(
        resetToken,
        process.env.JWT_RESET_PASSWORD_KEY,
        async (err, decoded) => {
          if (err) {
            return res.status(400).json("Invalid or expired token");
          }

          // Nếu token hợp lệ, tiến hành cập nhật mật khẩu
          const user = await User.findOne({ _id: decoded.id });
          if (!user) {
            return res.status(404).json("User not found");
          }

          // Mã hóa mật khẩu mới
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(req.body.password, salt);

          // Lưu mật khẩu mới
          await user.save();
          res.status(200).json("Password has been reset successfully");
        }
      );
    } catch (error) {
      res.status(500).json(error);
    }
  },

 

 
};

module.exports = authController;
