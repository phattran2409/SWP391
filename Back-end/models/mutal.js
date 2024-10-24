const { default: mongoose } = require("mongoose");

const mutalSchemma = mongoose.Schema({
  elementID_koi: {
    type: Number,
  },
  elementID_pond: {
    type: Number,
  },
  elementID_user:  { 
    type : Number
  }
});


module.exports = mongoose.model('mutuals',mutalSchemma);
