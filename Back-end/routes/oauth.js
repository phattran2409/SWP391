const { OAuth2Client } = require("google-auth-library");
var express = require('express');
var router = express.Router();
const dotenv = require('dotenv');
const User = require("../models/user");
const jwt = require("jsonwebtoken")
const crypto = require('crypto')
dotenv.config(); // Load environment variables from .env file



// async function getUserData(access_token) {



// Tách hàm để lấy dữ liệu người dùng
async function getUserData(access_token) {
  try {
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch user data: ${response.statusText}`);
    }
    const data = await response.json();
    console.log('User data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw new Error('Failed to fetch user data');
  }
}

const Generate =  {
  accessToken : (user) => {

    return jwt.sign(
      { id: user.id, admin: user.admin, memberStatus: user.memberStatus },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "1d" }
    );
  },
  refreshToken  : (user) => {
    
    return jwt.sign(
      { id: user.id, admin: user.admin , memberStatus : user.memberStatus },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "2d" }
    );
  }, 
}

router.post('/signin' , async  function(req ,res) {
   const data =  req.body.data
 console.log(data.email);
 const userExist = await  User.findOne({email : data.email})  

 // create password random 
 const randomPass = crypto.randomBytes(10).toString('hex');

 if (!userExist) {
  const nUser = new  User({
    email : data.email, 
    avatar  : data.picture, 
    provider : "Google", 
    name : data.name, 
    userName : data.email,
    password : randomPass, 

  })
  await nUser.save(); 
  console.log(nUser);
  const access_token = Generate.accessToken(nUser);
  const refresh_Token = Generate.refreshToken(nUser);
  
  console.log(access_token);
      res.cookie("refresToken", refresh_Token, {
        httpOnly: true,
        secure: false,
        maxAge: 3600000, // ms (miliseconds)
        path: "/",
        sameSite: "strict",
      });
  const {password ,...others} = nUser._doc;
  
  return res
    .status(200)
    .json({ ...others, message: "singin successful", accessToken: access_token });
  
 }else {
      const access_token = Generate.accessToken(userExist);
      const refresh_Token = Generate.refreshToken(userExist);

       res.cookie("refresToken", refresh_Token, {
         httpOnly: true,
         secure: false,
         maxAge: 3600000, // ms (miliseconds)
         path: "/",
         sameSite: "strict",
       });
       const {password , ...others} = userExist._doc;
       
      console.log(access_token);
  return res.status(200).json({accessToken : access_token , message  : "Login Successful" , ...others} )
 }

})
module.exports = router;

