const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
      enum: ["CREATE", "UPDATE", "DELETE", "LOGIN"],
    },
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    targetUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account", 
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
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AuditLog", auditLogSchema);