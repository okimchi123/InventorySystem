const AssetLog = require("../models/assetAudit"); 

const getAssetAuditLogs = async (req, res) => {
  try {
    const logs = await AssetLog.find()
      .sort({ createdAt: -1 });

    res.status(200).json(logs);
  } catch (error) {
    console.error(" Error fetching logs:", error); 
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getAssetAuditLogs };