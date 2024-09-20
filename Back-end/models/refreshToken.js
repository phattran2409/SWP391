const { default: mongoose } = require("mongoose");

const refreshToken = mongoose.Schema( {
    token :  {
        type : String
    }
})

module.exports = mongoose.model("refreshtokens" , refreshToken);
 