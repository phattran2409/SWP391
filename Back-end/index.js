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
const packageRouter  = require("./routes/package")
const memberRouter =require("./routes/member");
const paymentRouter  =require("./routes/payment");
const orderRouter  =  require("./routes/order");
const { default: mongoose } = require("mongoose");
const signInRouter = require("./routes/oauth")
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8888;

app.use(cors());
app.use(cookieParser());

app.use(express.json({ limit: '10mb' }));



app.use(express.urlencoded(true));



// AUTH ROUTER
app.use("/v1/auth", authRouter);
// user ROUTER 
app.use("/v1/user" , userRouter);
//  Sign in google
app.use("/v1/Oauth" , signInRouter);
//api  Fish
app.use("/v1/fish" , fishRouter);
// api ponds
app.use("/v1/pond" ,pondRouter );
// api  post ads 
app.use("/v1/member", memberRouter);

app.use("/v1/pay" , paymentRouter);


app.use("/v1/pond" , pondRouter);

app.use("/v1/post" , postRouter);
app.use("/v1/order" , orderRouter);

app.use("/v1/package",packageRouter);

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