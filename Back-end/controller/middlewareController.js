const jwt = require("jsonwebtoken") 


const middlewareController =  {
    verifyToken : (req , res , next) => {
        const token = req.headers.token || req.headers.authorization; 
         
        
        if (token) {
            // su dung cho headers khi co  "Bearer 12341"  token.split(" ")[1]
            const accessToken = token.startsWith("Bearer ")
              ? token.split(" ")[1]
              : token;
        
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user ) => {
              if (err) {
               return res.status(403).json("Token is not valid");
              }
              console.log("Decoded User:", user); // Log decoded user
              req.user = user;
              next();
            });
            
        }else {
           return res.status(404).json("you're not authenticated")
        }
    } , 
    verifyTokenAdminAuth : (req , res, next) => {
         middlewareController.verifyToken(req,res,  () =>
        { 
         if (req.user.id == req.params.id || req.user.admin) {
            next();
         }else{ 
            return res.status(403).json("You not allowed to DELETE ")
         }
        }) 
    },

}

module.exports = middlewareController