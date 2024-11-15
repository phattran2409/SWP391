const { default: mongoose } = require("mongoose");
const fishkois = require("./fishkoi.js");
const ponds = require("./pond.js");
const users = require("./user.js");
const { refreshToken } = require("../controller/authController");
const compareHistorySchema = mongoose.Schema({
    accountID : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : "users"
    } ,
    item : {
        type  : mongoose.Schema.Types.Mixed,
        fishkois : fishkois,
        ponds : ponds
    } 
   

});

module.exports = mongoose.model("comparehistories", compareHistorySchema);