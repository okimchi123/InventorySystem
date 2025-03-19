const mongoose = require("mongoose");

const distributeLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
      enum: ["DEPLOYED", "RETURNED"],
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    targetProduct: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assets", 
      required: true,
    }],
    fromUser: {
      type: String,
      required: true,
    },
    toUser: {
        type: String,
        required: true,
      },
    productName: [{
      type: String,
      required: true,
    }],
    productSN: [{
      type: String,
      required: true,
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("DistributeLog", distributeLogSchema);