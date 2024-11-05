const { default: mongoose } = require("mongoose");
// import mongoose from 'mongoose';

const elementsSchema = mongoose.Schema({
  elementID: {
    type: Number,

  },
  element: {
    type: String,
    
  },
  direction: {
    type: String,

  },
  Years : {
    type: [Number], // Mảng các năm
    
  },
  gender: {
    type: Number, // 1 có thể là Nam, 2 có thể là Nữ

  },
});

module.exports = mongoose.model("elements", elementsSchema);
