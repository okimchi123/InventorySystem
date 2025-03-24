const Asset = require("../models/Asset");
const Account = require("../models/User.js");
const DistributeLog = require("../models/distributeAudit");
const { emitAssetLogs, emitAssetSummary } = require("../utils/socketUtils");
const mongoose = require("mongoose");

const distributeAsset = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User ID missing" });
    }
    const fromUserID = req.user.id;

    const fromUser = await Account.findById(fromUserID);

    const { assetIds, userId } = req.body;

    if (!Array.isArray(assetIds) || assetIds.length === 0) {
      return res
        .status(400)
        .json({ message: "No assets selected for distribution" });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);
    const user = await Account.findById(userObjectId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await Asset.updateMany(
      { _id: { $in: assetIds } },
      {
        $set: {
          distributedTo: userId,
          distributedToName: `${user.firstname} ${user.lastname}`,
          distributedBy: `${fromUser.firstname} ${fromUser.lastname}`,
          status: "Distributed",
          distributionDate: new Date(),
        },
      }
    );

    user.handlingAssets.push(...assetIds);
    await user.save();

    const distributedAssets = await Asset.find({ _id: { $in: assetIds } });

    await DistributeLog.create({
      action: "DEPLOYED",
      userID: fromUserID,
      targetProduct: distributedAssets.map(asset => asset._id),
      fromUser: fromUser.email,
      toUser: user.email,
      productName: distributedAssets.map(asset => asset.productname),
      productSN: distributedAssets.map(asset => asset.serialnumber)
    });

    await emitAssetLogs(Asset);
    await emitAssetSummary(Asset);

    res.status(200).json({ message: "Assets successfully distributed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDistributeLogs = async (req, res) => {
  try {
    const logs = await DistributeLog.find()
      .sort({ createdAt: -1 });

    res.status(200).json(logs);
  } catch (error) {
    console.error(" Error fetching logs:", error); 
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUserDistributeLogs = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User ID missing" });
    }
    const userID = req.user.id;

    const userLogs = await DistributeLog.find({ userID })
      .populate("targetProduct", "productName productSN") 
      .sort({ createdAt: -1 });

    res.status(200).json(userLogs);
  } catch (error) {
    console.error("Error fetching user asset logs:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUsersWithAssets = async (req, res) => {
  try {
    const users = await Account.find({ handlingAssets: { $exists: true, $ne: [] } })
      .populate("handlingAssets")
      .select("firstname lastname phone email role handlingAssets");

    if (!users.length) {
      return res.status(404).json({ message: "No users handling assets found." });
    }

    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users with assets:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

module.exports = {
  distributeAsset,
  getDistributeLogs,
  getUsersWithAssets,
  getUserDistributeLogs,
};
