const { default: mongoose } = require("mongoose");
// import mongoose from 'mongoose';

const  fishKoiSchema = mongoose.Schema( {
    elementID : {
        type : Number
    },
    koiName : {
        type : String
    },
    description : {
        type : String
    }, 
    image  : {
        type : String
    },
    colors : { 
        type : [String]
    }
})



module.exports = mongoose.model("fishkois", fishKoiSchema);
