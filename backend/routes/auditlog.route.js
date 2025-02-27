const express = require("express");
const AuditLog = require("../models/accountAudit")
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// Get all audit logs (Admin only)
router.get("/", authenticateToken, async (req, res) => {
  try {
    const logs = await AuditLog.find()
      .populate("performedBy", "email") 
      .populate("targetUser", "email")
      .sort({ timestamp: -1 });

    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;