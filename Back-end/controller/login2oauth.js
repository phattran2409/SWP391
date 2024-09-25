const { OAuth2Client } = require("google-auth-library");
const { default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken")
const User = require("../models/user");
const { accessToken } = require("./authController");

const client = new OAuth2Client(process.env.CLIENT_ID);

const  generateAccessToken = (user) => {
    return jwt.sign({ id : user._id,  admin : user.admin } , process.env.JWT_ACCESS_KEY , {expiresIn :  "1d"});
}

const generateRefreshToken  = (user) => {
  return jwt.sign(
    { id: user._id, admin: user.admin },
    process.env.JWT_REFRESH_KEY,
    { expiresIn: "1d" }
  );
};


const SigninGoogle =  async (req ,res ) =>  {
    const {token} = req.body
     try {
         const accessToken = " ";
        const refreshToken = " ";
          const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID, // Specify the CLIENT_ID of your app
          });
          const payload = ticket.getPayload();
          const { email, name, picture } = payload;

          // Check if user already exists in MongoDB
          let user = await User.findOne({ email });
         
           if (!user) { 
             user =  await new User({
               email,
               Name: name,
               avatar : picture,
             });
            await user.save();
           }else {
             accessToken = generateAccessToken(user); 
             refreshToken = generateRefreshToken(user);
              res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                maxAge: 3600000, // ms (miliseconds)
                path: "/",
                sameSite: "strict",
              });
           }

          res.status(200).json({user , accessToken : accessToken})

     }catch (err) {
        console.log(err);
     }
}



