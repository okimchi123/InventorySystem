const mongoose = require("mongoose");

const returnLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
      enum: ["RETURNED", "CANCELLED"],
    },
    returnedToID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    returnedByID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    targetProduct: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assets",
      required: true,
    },
    fromUserName: {
      type: String,
      required: true,
    },
    toUserName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("returnLog", returnLogSchema);
