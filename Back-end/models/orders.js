const { default: mongoose, Types } = require("mongoose");
const  users  = require("../models/user")

const orderSchema = mongoose.Schema(
  {
    accountID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    orderId: {
      type: String,
      unique: true,
    },
    amount: {
      type: Number,
    },
    packageType :{
        type: String, 
    
    },
    message: {
      type: String,
    },
    resultCode: {
      type: Number,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('orders' , orderSchema);