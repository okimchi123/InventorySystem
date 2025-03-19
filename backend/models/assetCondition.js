const mongoose = require("mongoose");

const AssetConditionLogSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    fromUser: {
      type: String,
      required: true,
    },
    targetProduct: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assets",
      required: true,
    },
    productname: {
      type: String,
      required: [true, "Please enter Product Name "],
    },
    producttype: {
      type: String,
      enum: [
        "Laptop",
        "Charger",
        "Mouse",
        "Phone",
        "Chair",
        "Table",
        "Box",
        "Cable",
        "Monitor",
        "Printer",
      ],
      required: true,
    },
    serialnumber: {
      type: String,
      default: 0,
      required: true,
    },
    reason: {
      type: String,
      required: false,
    },
    condition: {
      type: String,
      enum: ["Good", "Broken", "Scrap"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("AssetConditionLog", AssetConditionLogSchema);
