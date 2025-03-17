const AuditLog = require("../models/accountAudit"); 

const getUserAuditLogs = async (req, res) => {
  try {
    const logs = await AuditLog.find()
      .populate("performedBy", "email role")
      .populate("targetUser", "status") // FIX: Populate targetUser to fetch status
      .sort({ createdAt: -1 });

    res.status(200).json(logs);
  } catch (error) {
    console.error(" Error fetching logs:", error); // Log error
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


module.exports = { getUserAuditLogs };
