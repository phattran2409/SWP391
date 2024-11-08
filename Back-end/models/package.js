const { default: mongoose, Types } = require("mongoose");

mongoose    

const PackageSchema = mongoose.Schema(
  {
    packageType: {
      type: String,
    },
    amount: {
      type: Number,
    },
    expiresDay: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports  = mongoose.model('packages' , PackageSchema);