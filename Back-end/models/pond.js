const { default: mongoose } = require("mongoose");

const pondSchema = mongoose.Schema(
  {
    elementID: {
      type: Number,
    },
    shape: {
      type: String,
    },
    description: {
      type: String,
    },
    trees: {
      type: String,
    },
    waterFlow: {
      type: String,
    },
    light: {
      type: String,
    },
    direction: {
      type: [String],
    },
    image: {
      type: String,
    },
  },

  {
    timestamps: true,

  }
);

module.exports = mongoose.model("ponds", pondSchema);
