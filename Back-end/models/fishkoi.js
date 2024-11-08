const { default: mongoose } = require("mongoose");
<<<<<<< HEAD

const  fishKoiSchema = mongoose.Schema( {
    elementID : {
        type : String
=======
// import mongoose from 'mongoose';

const  fishKoiSchema = mongoose.Schema( {
    elementID : {
        type : Number
>>>>>>> develop
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

<<<<<<< HEAD
module.exports = mongoose.model('fishkois' ,fishKoiSchema)
=======


module.exports = mongoose.model("fishkois", fishKoiSchema);
>>>>>>> develop
