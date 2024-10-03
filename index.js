const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const connection = require("./config/database");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const fishRouter = require("./routes/fish");
const pondRouter = require("./routes/pond");
const postRouter = require("./routes/post");
const { default: mongoose } = require("mongoose");
const signInRouter = require("./routes/oauth")
const app = express();
const port = process.env.PORT || 8888;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

// AUTH ROUTER
app.use("/v1/auth", authRouter);
// user ROUTER 
app.use("/v1/user" , userRouter);
//  Sign in google
app.use("/v1/Oauth" , signInRouter);
// 
app.use("/v1/fish" , fishRouter);

app.use("/v1/pond" , pondRouter);

app.use("/v1/post" , postRouter);

(async () => {
   try {
      await connection();
      app.listen(port, () => {
        console.log("server is running at " + port);
      });

   } catch (error) {
      console.log(error);
      
   }
})
();