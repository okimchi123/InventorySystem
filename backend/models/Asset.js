const mongoose = require("mongoose");

const AssetSchema = new mongoose.Schema(
    {
        productname: {
          type: String,
          required: [true, "Please enter Product Name "],
        },
        producttype: {
          type: String,
          enum: ["Laptop", 
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
        description: {
          type: String,
          required: [true, "Please enter a Product Description "],
        },
        reason: {
          type: String,
          required: false,
        },
        status: {
          type: String,
          enum: ["just_added", "Distributed", "Cancelled"],
          default: "just_added",
        },
        condition: {
          type: String,
          enum: ["Good", "Broken", "Scrap"],
          default: "Pending",
        },
        availablestock:{
          type: Number,
          required: false,
          default: 0,
        },
        deployedstock:{
          type: Number,
          required: false,
          default: 0,
        },
        distributedTo: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Account",
          required: false,
        },
        distributedToName: {  
          type: String,
          required: false,
        },
      },
      {
        timestamps: true,
      }
);

module.exports = mongoose.model("Assets", AssetSchema);