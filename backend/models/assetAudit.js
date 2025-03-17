const mongoose = require("mongoose");

const assetLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
      enum: ["CREATE", "UPDATE", "DELETE", "MULTIDELETE"],
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
    userEmail: {
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
    userRole: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AssetLog", assetLogSchema);