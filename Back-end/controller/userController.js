const User = require("../models/user");
const elements = require("../models/element")
const packageMember = require("../models/packageMember");
const bcrypt = require("bcrypt");
const cloudinary = require("../config/cloudinary");
const upload = require("../middleware/multer");
const { UploadStream } = require("cloudinary");

const jwt = require("jsonwebtoken");

//npm install nodemailer
const nodemailer = require("nodemailer");
const fs = require("fs");
const { log, error } = require("console");
const element = require("../models/element");
const mutal = require("../models/mutal");
const { MongoClient } = require("mongodb");
const pond = require("../models/pond");

require("dotenv").config();

const useController = {
  getAllUsr: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const sortOrder = req.query.sort || "asc";
      const sortBy = parseInt(req.query.sortBy) || 0;

      const sortByValue = ["name"];
      const sortOrderValue = sortOrder == "asc" ? 1 : -1;
      const sortOptions = {
        [sortByValue[sortBy]]: sortOrderValue,
      };

      const skip = (page - 1) * limit;
      const user = await User.find().sort(sortOptions).skip(skip).limit(limit);

      const totalDocuments = await User.countDocuments();
      const members = await User.countDocuments({ memberStatus: true });
      return res.status(200).json({
        currentPage: page,
        totalPages: Math.ceil(totalDocuments / limit),
        totalDocuments: totalDocuments,
        data: user,
        members: members,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteUser: async (req, res) => {
    try {
      // neu muon xoa mot user trong Database thi findByIdandDelete
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("DELETE SUCCESSFULLY ");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  createUser: async (req, res) => {
    try {
      const {
        userName,
        name,
        email,
        password,
        admin,
        phoneNumber,
        avatar,
        memberStatus,
        gender,
        birthDate,
      } = req.body;

      const data = {
        userName,
        name,
        email,
        password,
        admin,
        phoneNumber,
        avatar,
        memberStatus,
        gender,
        birthDate,
      };
      // hash  password
      if (password) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(data.password, salt);
        data.password = hashPassword;
      }

      const nUser = new User(data);
      await nUser.save();
      return res.status(200).json("successfull create new User");
    } catch (err) {
      if (err.code === 11000) {
        return res.status(500).json(err.errmsg);
      }
      return res.status(500).json(err);
    }
  },
  updateUser: async (req, res) => {
    try {
      const idUser = req.params.id;
      const updateData = req.body;

      console.log(idUser);

      console.log(updateData);
      // kiểm tra xem password có hash ko
      const regex = /^\$2[ayb]\$.{56}$/;

      if (!regex.test(updateData.password)) {
        const salt = await bcrypt.genSalt(10);
        const hashedPawssword = await bcrypt.hash(updateData.password, salt);
        updateData.password = hashedPawssword;
      }

      const updateUsr = await User.findByIdAndUpdate(idUser, updateData, {
        new: true,
        runValidators: true,
      });
      console.log(updateUsr);

      if (!updateUsr) {
        return res.status(404).json({ error: "User Not found" });
      }
      // neu muon update sai save()
      // await updateUsr.save();
      console.log(updateUsr);

      res.status(202).json(updateUsr);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },
  updateUserForUser: async (req, res) => {
    try {
        const idUser = req.params.id
        const updateData = req.body
     
        
         const updateUsr = await User.findByIdAndUpdate(idUser , updateData ,  {
          new : true , 
          runValidators : true,
        })
        
        if (!updateUsr) {
          return res.status(404).json({ error: "User Not found" });
        }
        // neu muon update sai save()
        // await updateUsr.save();
        res.status(202).json(updateUsr)

    } catch (err) {
      res.status(500).json(err)
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json("Not found user");
      }

      res.status(200).json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  subcribeMemberShip: async (req, res) => {
    try {
      const packageType = req.body.packageType;
      const id = req.body.id;

      // console.log(id);
      // console.log(packageType);

      // check account id da dk goi member hay chua
      const isExist = await packageMember
        .findOne({ accountID: req.body.id })
        .populate("accountID");
      console.log(isExist);

      if (isExist) {
        let isExistMemberStatus = await User.findById(req.body.id);
        if (isExistMemberStatus.memberStatus) {
          return res
            .status(403)
            .json({ error: "account was subcribe member " });
        }
        return res.status(403).json({
          error:
            "account was create member package ,Press Process to payment again",
          errorCode: 1,
        });
      }

      let day;
      let Name = " ";
      switch (packageType) {
        case "Basic":
          day = 30;
          Name = "Basic";
          break;
        case "Advanced":
          day = 60;
          Name = "Advanced";
          break;
        case "Plus":
          day = 90;
          Name = "Plus";
          break;
        default:
          return res.status(404).json({ error: "invalid package type" });
          break;
      }
      let DateExpires = new Date(Date.now() + day * 24 * 60 * 60 * 1000);
      const packageMem = new packageMember({
        accountID: id,
        name: Name,
        expires: DateExpires,
      });

      // update status member
      // const updateUser = await User.findByIdAndUpdate(id, {
      //   memberStatus: true,
      // });

      // save  to database
      const newpackageMembers = await packageMem.save();

      // res to json
      return res
        .status(200)
        .json({ newpackageMembers, message: "need proccess payment" });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  DeleteMemberPackage: async (req, res) => {
    const result = await packageMember.deleteOne({ accountID: req.body.id });
    if (result.deletedCount > 0) {
      return res.status(200).json({
        error: "Member Package was delete you can add another member package",
      });
    }
  },
  search: async (req, res) => {
    try {
      // const searchName = req.query.sName|| "";
      // const searchUserName = req.query.sUserName ||  "";
      const page = req.query.page || 1;
      const limit = req.query.limit || 10;
      const sortBy = req.query.sort || 0;
      const sortOrder = req.query.sortOrder || "asc";
      const skip = (page - 1) * limit;
      // request query
      const { searchName, searchUserName } = req.query;

      const sortByValue = ["name", "createdAt"];

      let sortOrderValue;
      // option sort
      switch (sortOrder) {
        case "asc":
          sortOrderValue = 1;
          break;
        case "desc":
          sortOrderValue = -1;
          break;
        default:
          sortOrderValue = 1;
          break;
      }

      // sort options
      const sortOptions = {
        [sortByValue[sortBy]]: sortOrderValue,
      };
      console.log(sortOptions);

      // storage
      let query = {};
      if (searchName && !searchUserName) {
        query.name = {
          $regex: searchName,
          $options: "i",
        };
      }
      if (!searchName && searchUserName) {
        query.userName = {
          $regex: searchUserName,
          $options: "i",
        };
      }
      if (!searchName && !searchUserName) {
        query = {};
      }
      console.log(query);

      const listCollection = await User.find(query)
        .skip(skip)
        .limit(limit)
        .sort(sortOptions);

      // dem tong data trong 1 collection
      const totalDocuments = await User.countDocuments();

      return res.status(200).json({
        pageCurrent: page,
        // <<<<<<< HEAD
        //         totalPage: Math.ceil(totalDocuments / limit),
        //         totalDocuments: totalDocuments,
        // =======
        totalPage: Math.ceil(listCollection.length / limit),
        totalDocuments: listCollection.length,

        data: listCollection,
      });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  uploadImage: async (req, res) => {
    console.log(req.file);
    cloudinary.uploader.upload(
      req.file.path,
      { folder: "avatar" },
      function (err, result) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: "Error",
          });
        }

        return res.status(200).json({ data: result.secure_url });
      }
    );
  },
  uploadImages: async (req, res) => {
    try {
      console.log(req.files);
      // kiem tra xem các file có được upload
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No files uploaded",
        });
      }
      //

      const uploadPromises = req.files.map((file) => {
        return cloudinary.uploader.upload(file.path, {
          folder: "post",
        });
      });

      const results = await Promise.all(uploadPromises);
      console.log(" RESULT AFTER UPLOAD  CLOUDINARY  : " + results);

      // lam trong thu muc upload sau khi  được upload lên cloud
      req.files.forEach((file) => {
        fs.unlink(file.path, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
          }
        });
      });

      const urls = results.map((result) => result.secure_url);

      return res.status(200).json({
        success: true,
        data: urls,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "An error occurred while uploading the images",
      });
    }
  },

  updatePassword: async (req, res) => {
    try {
      const userId = req.user.id;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const ValidPassword = await bcrypt.compare(
        req.body.currentPassword,
        user.password
      );
      if (!ValidPassword) {
        return res.status(401).json("Wrong password!");
      }

      if (req.body.newPassword.length < 6) {
        return res
          .status(400)
          .json({ message: "New password must be at least 6 characters long" });
      }

      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(req.body.newPassword, salt);

      user.password = newPassword;
      await user.save();
      return res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  sendChangeEmail: async (req, res) => {
    try {
      const email = req.body.email;
      const userId = req.user.id;

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.email !== email) {
        return res.status(400).json({ message: "Your email is incorrect" });
      }

      // Tạo JWT Token
      const changeEmailToken = jwt.sign(
        { id: userId },
        process.env.JWT_CHANGE_EMAIL_KEY,
        { expiresIn: "15m" }
      );

      // Cấu hình Nodemailer
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Gửi email xác nhận
      const mailOptions = {
        to: email,
        subject: "Email Change Confirmation",
        html: `
          <p>You have requested to change your email address. Click the link below to confirm:</p>
          <p><a href="http://localhost:${process.env.PORT}/v1/user/send-change-email/${changeEmailToken}">Email Change Confirmation</a></p>
          <p>This link will expire after 15 minutes. If you do not request a change, please ignore this email.</p>
        `,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json(error);
        }
        res.status(200).json("Email change confirmation sent");
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  confirmChangeEmail: async (req, res) => {
    try {
      const changeEmailToken = req.params.token || req.body.token;

      if (!changeEmailToken) {
        return res.status(400).json("Token not provided");
      }

      // Xác thực token
      jwt.verify(
        changeEmailToken,
        process.env.JWT_CHANGE_EMAIL_KEY,
        async (err, decoded) => {
          if (err) {
            console.error("Token verification error:", err);
            return res.status(400).json("Invalid or expired token");
          }

          const id = decoded.id;
          const newEmail = req.body.email;

          // Kiểm tra lại xem email mới có bị sử dụng chưa
          const existingEmail = await User.findOne({ email: newEmail });
          if (existingEmail) {
            return res.status(400).json("This email has already been used");
          }

          // Tìm người dùng theo ID
          const user = await User.findById(id);
          if (!user) {
            return res.status(404).json("User not found");
          }

          const oldEmail = user.email; // Lưu email cũ để thông báo sau

          // Cập nhật email mới
          user.email = newEmail;
          await user.save();

          const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          });

          const mailOptionsOldEmail = {
            to: oldEmail,
            subject: "Email Change Notification",
            html: `
              <p>Your user email address have been changed from <strong>${oldEmail}</strong> to <strong>${newEmail}</strong>.</p>
              <p>If you do not make this change, please contact support immediately.</p>
            `,
          };

          transporter.sendMail(mailOptionsOldEmail, (error, info) => {
            if (error) {
              console.error(
                "Error sending notification email to old email:",
                error
              );
              // Không trả lỗi cho người dùng vì thay đổi email đã thành công
            }
          });

          res.status(200).json("Email has been changed successfully");
        }
      );
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  NotificationStatus: async (req, res) => {
    try {
      console.log(req.body.id, req.body.notificationID);

      const updateUser = await User.findOneAndUpdate(
        { _id: req.body.id, "notification._id": req.body.notificationID },
        {
          $set: {
            "notification.$.status": false,
          },
        },
        { new: true }
      );
      if (!updateUser) {
        return res.status(404).json("Notification or user not found");
      }
      return res.status(200).json({
        Error: false,
        data: updateUser,
      });
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  getNotification: async (req, res) => {
    try {
      const userId = req.user.id;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json("User not found");
      }
  
     
      const unreadNotifications = user.notification.filter(notification => notification.status === true);
  
      return res.status(200).json(unreadNotifications);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  
  calculateElement : async (req , res) => { 
      const year = req.query.y; 
      console.log( typeof parseInt(year));
      
    try {
     const result = await elements.findOne({
      "Years " : parseInt(year), 
       "gender" : parseInt(req.query.gender)
     });  
      console.log(result);
      
    if (result) {
      return res.status(200).json({
        elementID : result.elementID, 
        element :  result.element, 
        direction : result.direction,
      });
       
    }
     return  res.status(404).json("Not Found");
    }catch(err) { 
      console.log(err);
      
      return res.status(500).json({err});
    }
  },

  //  
  rateMutual : async (req ,res)=> {

      // const elementID_koi  = req.query.elementKoi; 
      // const elementID_pond  = req.query.elmentPond; 
      // const elementID_user = req.query.elementID_user;
    
    const { elementID_koi, elementID_pond, elementID_user } = req.body;

    try {
      // Kiểm tra xem các trường cần thiết có được cung cấp đầy đủ hay không
      if (!elementID_koi || !elementID_pond || !elementID_user) {
        return res.status(400).json("Missing Required Parameters");
      }
      console.log({elementID_koi , elementID_pond  , elementID_user});
      
      // Truy vấn để tìm tài liệu với cả 3 trường
      const result = await mutal.findOne({
        elementID_koi: elementID_koi,
        elementID_pond: elementID_pond,
        elementID_user: elementID_user,
      });

      // Kiểm tra kết quả
      if (result) {
        return res.status(200).json({success : 1 , message : "Mutual Generation"}); // Trả về tài liệu nếu tìm thấy
      } else {
        return res.status(200).json({success : 0 , message :"Mutual Overcoming"});
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json("Error system");
    }
  },

  getMonthlyUserCount: async (req, res) => {
    try {
      const monthlyOrderCounts = await User.aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
        {
          $sort: {
            "_id.year": 1,
            "_id.month": 1,
          },
        },
      ]);
  
      // Initialize array for all 12 months with count = 0
      const currentYear = new Date().getFullYear(); // Or specify any year you need
      const formattedResults = Array.from({ length: 12 }, (_, i) => ({
        year: currentYear,
        month: i + 1,
        count: 0,
      }));
  
      // Update array with actual data where available
      monthlyOrderCounts.forEach((item) => {
        const index = item._id.month - 1; // Convert month to 0-indexed
        formattedResults[index].count = item.count;
        formattedResults[index].year = item._id.year; // Ensure the correct year is set
      });
  
      return res.status(200).json(formattedResults);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

};

module.exports = useController;
