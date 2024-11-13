const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      require: true,
      minlength: 6,
      maxlength: 40,
      unique: true,
    },
    name  : { 
      type : String, 
      
    } , 
    email: {
      type: String,
      require: true,
      minlength: 10,
      maxlength: 50,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      minlength: 6,
    },
    
    admin: {
      type: Boolean,
      default: false,
    },
    phoneNumber : {
      type : String,
      
    } ,
    avatar : { 
      type : String
    } ,
    memberStatus: {
      type: Boolean,
      default: false
    },
    gender : {
      type: Number,
    // Ví dụ: 0 - Nam, 1 - Nữ
    },

    birthDate : {
      type : Date,
    },

    provider :  {
      type : String,
    } ,
    elementID : {
      type : Number, 
    } ,
    notification : [
     {  
      content :  {
        type : String,
      } ,
      status : {
        type : Boolean,
      },
       
     },
    {timestamps :true}
    ]

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", userSchema);
