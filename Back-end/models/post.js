const { default: mongoose } = require("mongoose");


const postSchema = new mongoose.Schema(
  {
    elementID: {
      type: Number,
      required: true,
      min: 1, 
      max: 5, 
    },

    categoryID : {
      type: Number,
      required: true,
      min: 1, 
      max: 3, 
    },

    title: {
      type: String,
      required: true,
    },

    context: {
      type: String,
     
    },

    imageThumbnail: {
      type: String,
      required: true,
    },

    // image: {
    //   type: [String],
    //   default: [],
    // },

    postStatus: {
      type: Boolean,
      default: false,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },

  },
  {
    timestamps: true,
  }
)



module.exports = mongoose.model('posts', postSchema);
