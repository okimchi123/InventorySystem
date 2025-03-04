const mongoose = require("mongoose");

const AssetSchema = new mongoose.Schema(
    {
        productname: {
          type: String,
          required: [true, "Please enter Product Name "],
        },
        producttype: {
          type: String,
          enum: ["Laptop", "Charger", "Mouse", "Phone"],
          required: true,
        },
        serialnumber: {
          type: String,
          default: 0,
          required: true,
        },
        description: {
          type: String,
          required: [true, "Please enter a Product Description "],
        },
        status: {
          type: String,
          enum: ["Pending", "Completed", "Cancelled"],
          default: "Pending",
        },
      },
      {
        timestamps: true,
      }
);

module.exports = mongoose.model("Assets", AssetSchema);