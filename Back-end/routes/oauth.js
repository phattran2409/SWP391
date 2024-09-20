const { OAuth2Client } = require("google-auth-library");
var express = require('express');
var router = express.Router();
const dotenv = require('dotenv');
const User = require("../models/user");
dotenv.config(); // Load environment variables from .env file



// async function getUserData(access_token) {
//   const response = await fetch(
//     `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
//   );

//   //console.log('response',response);
//   const data = await response.json();
//   console.log("data", data);
// }

// /* GET home page. */
// router.get("/", async function (req, res, next) {
//   const code = req.query.code;

//   console.log(code);
//   try {
//     const redirectURL = "http://localhost:8081/oauth";
//     const oAuth2Client = new OAuth2Client(
//       process.env.CLIENT_ID,
//       process.env.CLIENT_SECRET,
//       redirectURL
//     );
//     const r = await oAuth2Client.getToken(code);
//     // Make sure to set the credentials on the OAuth2 client.
//     await oAuth2Client.setCredentials(r.tokens);
//     console.info("Tokens acquired.");
//     const user = oAuth2Client.credentials;
//     console.log("credentials", user);
//     await getUserData(oAuth2Client.credentials.access_token);
//   } catch (err) {
//     console.log("Error logging in with OAuth2 user", err);
//   }

//   res.redirect(303, "http://localhost:5173/");
// });




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

/* GET home page */
router.get('/', async function(req, res) {
  const code = req.query.code;
  console.log('Authorization code:', code);

  if (!code) {
    return res.status(400).json({ error: 'Authorization code is missing' });
  }

  try {
    const redirectURL = 'http://localhost:8081/oauth';
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;

    const oAuth2Client = new OAuth2Client(clientId, clientSecret, redirectURL);

    // Lấy token từ Google với authorization code
    const { tokens } = await oAuth2Client.getToken(code);
    if (!tokens || !tokens.access_token) {
      throw new Error('Failed to retrieve access token');
    }

    // Thiết lập token cho client
    oAuth2Client.setCredentials(tokens);
    console.info('Tokens acquired:', tokens);

    // Lấy thông tin người dùng từ access token
    const userData = await getUserData(tokens.access_token);
    // 
    const user = await new User({
        
    })
        // Phản hồi với thông tin người dùng
    res.status(200).json({
      message: 'User successfully authenticated',
      user: userData,
    }); 



     } catch (error) {
    console.error('Error during OAuth2 authentication:', error);
    return res.status(500).json({ error: 'Authentication failed', details: error.message });
  }
});

module.exports = router;

