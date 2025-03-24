const AssetLog = require("../models/assetAudit"); 
const AssetConditionLog = require("../models/assetCondition");

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

const getUserAssetLogs = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User ID missing" });
    }
    const userID = req.user.id;

    const userLogs = await AssetLog.find({ userID })
      .populate("targetProduct", "productName productSN") 
      .sort({ createdAt: -1 });

    res.status(200).json(userLogs);
  } catch (error) {
    console.error("Error fetching user asset logs:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAssetConditionLogs = async (req, res) => {
  try {
    const logs = await AssetConditionLog.find()
      .sort({ createdAt: -1 });

    res.status(200).json(logs);
  } catch (error) {
    console.error(" Error fetching logs:", error); 
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getAssetAuditLogs, getAssetConditionLogs, getUserAssetLogs };