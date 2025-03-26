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

    const updateFields = {
      distributedTo: userId,
      distributedToName: `${user.firstname} ${user.lastname}`,
      distributedByName: `${fromUser.firstname} ${fromUser.lastname}`,
      status: "Distributed",
      distributionDate: new Date(),
    };

    if (fromUser.role === "Moderator") {
      updateFields["distributedByModID"] = fromUserID;
    } else if (fromUser.role === "Admin") {
      updateFields["distributedByAdminID"] = fromUserID;
    }

    await Asset.updateMany(
      { _id: { $in: assetIds } },
      { $set: updateFields }
    );

    user.handlingAssets.push(...assetIds);
    await user.save();

    if (fromUser.role === "Moderator") {
      fromUser.handlingAssets = fromUser.handlingAssets.filter(
        assetId => !assetIds.includes(assetId.toString())
      );
      await fromUser.save();
    }

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

const getUsersWithAssetsDistributedByUser = async (req, res) => {
  try {
    const distributingUserID = req.user.id;

    const fromUser = await Account.findById(distributingUserID);
    
    let assets;

    if (fromUser.role === "Moderator") {
      assets = await Asset.find({ distributedByModID: distributingUserID }).select("_id");
    } else if (fromUser.role === "Admin") {
      assets = await Asset.find({ distributedByAdminID: distributingUserID }).select("_id");
    }

    if (!assets.length) {
      return res.status(404).json({ message: "No assets distributed by this user." });
    }

    const assetIds = assets.map(asset => asset._id);

    const users = await Account.find({ handlingAssets: { $in: assetIds } })
      .populate("handlingAssets")
      .select("firstname lastname phone email role handlingAssets");

    if (!users.length) {
      return res.status(404).json({ message: "No users found handling assets from this user." });
    }

    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users with assets distributed by user:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

const requestReturn = async (req, res) => {
  try {
    const { assetId } = req.body;

    if (!assetId) {
      return res.status(400).json({ message: "Asset ID is required" });
    }

    const asset = await Asset.findById(assetId);
    
    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }

    asset.status = "request_return";
    await asset.save();

    res.status(200).json({ message: "Return request submitted successfully", asset });
  } catch (error) {
    console.error("Error requesting return:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

module.exports = {
  distributeAsset,
  getDistributeLogs,
  getUsersWithAssets,
  getUserDistributeLogs,
  getUsersWithAssetsDistributedByUser,
  requestReturn,
};
