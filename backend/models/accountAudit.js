const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
      enum: ["CREATE_USER", "UPDATE_USER", "DELETE_USER", "LOGIN"], // Add more as needed
    },
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account", // Admin who performed the action
      required: true,
    },
    targetUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account", // User affected by the action
      required: false,
    },
    userEmail:{
        type: String,
        required: true,
    },
    userRole:{
      type: String,
      required: true,
    }
    ,
    adminEmail:{
      type: String,
      required: true,
    }
    ,
    details: {
      type: String,
      required: true, // Example: "Admin John created user Jane"
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AuditLog", auditLogSchema);