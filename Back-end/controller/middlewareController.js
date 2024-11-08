const jwt = require("jsonwebtoken");
const multer = require("multer");
const packageMember = require("../models/packageMember");
const user = require("../models/user");



const middlewareController = {
  verifyToken: (req, res, next) => {
    const token = req.headers.token || req.headers.authorization;
    if (token) {
      // su dung cho headers khi co  "Bearer 12341"  token.split(" ")[1]
      const accessToken = token.startsWith("Bearer ")
        ? token.split(" ")[1]
        : token;
      console.log(accessToken);

      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
          return res.status(403).json("Token is not valid");
        }
        console.log("Decoded User:", user); // Log decoded user
        req.user = user;
        next();
      });
    } else {
      return res.status(404).json("you're not authenticated");
    }
  },
  verifyTokenAdminAuth: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (req.user.id == req.params.id || req.user.admin) {
        next();
      } else {
        return res.status(403).json("You Are Not Authenticated ");
      }
    });
  },
  verifyTokenMember: (req, res, next) => {
    middlewareController.verifyToken(req, res, async () => {
      console.log(req.user.id);
      //  neu la admin thi qua middle tiep theo
      if (req.user.admin) {
        return next();
      }
      ///  neu trong token co member status la true kiem tra con han cho package member ko
      //   neu het han  thi  xoa pacckage cu va set lai membersatus
      if (req.user.memberStatus) {
        try {
          const packageMem = await packageMember
            .find({ accountID: req.user.id })
            .populate("accountID");
          console.log(packageMem);

          if (packageMem.length > 0) {
            const currentDate = new Date();
            const expiresDate = new Date(packageMem[0].expires);
            console.log("date member : " + expiresDate.toISOString());
            console.log(" Current date : " + currentDate.toISOString());

            if (expiresDate < currentDate) {
              // xóa đi cái packageMember cũ
              const result = await packageMember.findByIdAndDelete(
                packageMem[0]._id
              );
              console.log("result  of delete package" + result);

              if (result.deletedCount > 0) {
                console.log("member package was clear");
              }
              // cap nhat notification cho user
              const newnotification = {
                content: "Membership expried , Please register again",
                status: true,
              };
              await user.findByIdAndUpdate(
                req.user.id,
                {
                  memberStatus: false,
                  $push: { notification: newnotification },
                },
                { new: true }
              );
              return res
                .status(403)
                .json("Membership expired , Please register again");
            } else {
              next();
            }
          } else {
            return res.status(404).json("Not found memberShip");
          }
        } catch (err) {
          console.error("Error verifying membership:", err);
          return res.status(500).json("Server error");
        }
      } else {
        return res.status(403).json("You need join Member ");
      }
    });
  },
};

module.exports = middlewareController;
