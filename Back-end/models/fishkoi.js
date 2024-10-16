const { default: mongoose } = require("mongoose");

const  fishKoiSchema = mongoose.Schema( {
    elementID : {
        type : String
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

module.exports = mongoose.model('fishkois' ,fishKoiSchema)