const { default: mongoose } = require("mongoose");
const User = require("./user");

const packageMemberSchema = new mongoose.Schema(
  {
    accountID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    name : {
      type: String,
    },
    expires: {
      type: Date,
    },
    price : {
      type : String,
    }
  },
  {
    timestamps: true,
  }
);





module.exports = mongoose.model('packagemembers' , packageMemberSchema);