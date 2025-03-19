const Asset = require("../models/Asset");
const AssetLog = require("../models/assetAudit");
const AssetConditionLog = require("../models/assetCondition");
const Account = require("../models/User");
const { emitAssetLogs, emitAssetSummary } = require("../utils/socketUtils");

const getAssets = async (req, res) => {
  try {
    const assets = await Asset.find();
    res.status(200).json(assets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addAsset = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User ID missing" });
    }
    const userId = req.user.id;

    const user = await Account.findById(userId);

    const {
      productname,
      producttype,
      serialnumber,
      description,
      condition,
      reason,
    } = req.body;

    const existingAsset = await Asset.findOne({ serialnumber });

    if (existingAsset) {
      return res.status(400).json({ message: "Serial Number is already used" });
    }

    const asset = await Asset.create({
      productname,
      producttype,
      serialnumber,
      description,
      condition,
      reason,
    });

    await AssetLog.create({
      action: "CREATE",
      userID: userId,
      targetProduct: asset._id,
      userEmail: user.email,
      userRole: user.role,
      productName: asset.productname,
      productSN: asset.serialnumber,
    });

    if (["Broken", "Scrap"].includes(asset.condition)) {
      await AssetConditionLog.create({
        userID: userId,
        fromUser: user.email,
        targetProduct: asset._id,
        productname: asset.productname,
        producttype: asset.producttype,
        serialnumber: asset.serialnumber,
        reason: asset.reason,
        condition: asset.condition,
      });
    }

    await emitAssetLogs(Asset);
    await emitAssetSummary(Asset);

    res.status(201).json({ message: "Asset created successfully!", asset });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAsset = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User ID missing" });
    }
    const userId = req.user.id;

    const user = await Account.findById(userId);

    const { id } = req.params;

    const existingAsset = await Asset.findById(id);

    if (!existingAsset) {
      return res.status(404).json({ message: "Asset not found" });
    }

    if (req.body.condition === "Good" || req.body.condition === "Scrap") {
      req.body.reason = null;
    }
    
    const asset = await Asset.findByIdAndUpdate(id, req.body, { new: true });

    await AssetLog.create({
      action: "UPDATE",
      userID: userId,
      targetProduct: asset._id,
      userEmail: user.email,
      userRole: user.role,
      productName: asset.productname,
      productSN: asset.serialnumber,
    });

    await AssetConditionLog.create({
      userID: userId,
      fromUser: user.email,
      targetProduct: asset._id,
      productname: asset.productname,
      producttype: asset.producttype,
      serialnumber: asset.serialnumber,
      reason: asset.condition === "Good" ? null : asset.reason, // Set reason to null if condition is "Good"
      condition: asset.condition,
    });

    await emitAssetLogs(Asset);

    res.status(200).json(asset);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAsset = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User ID missing" });
    }
    const userId = req.user.id;

    const user = await Account.findById(userId);

    const { id } = req.params;

    const existingAsset = await Asset.findById(id);

    if (!existingAsset) {
      return res.status(404).json({ message: "Asset not found" });
    }

    const asset = await Asset.findByIdAndDelete(id);

    await AssetLog.create({
      action: "DELETE",
      userID: userId,
      targetProduct: asset._id,
      userEmail: user.email,
      userRole: user.role,
      productName: asset.productname,
      productSN: asset.serialnumber,
    });

    await emitAssetLogs(Asset);
    await emitAssetSummary(Asset);

    res.status(200).json({ message: `${asset.productname} asset is deleted` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMultipleAssets = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User ID missing" });
    }
    const userId = req.user.id;

    const user = await Account.findById(userId);

    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res
        .status(400)
        .json({ message: "No assets selected for deletion" });
    }

    const existingAssets = await Asset.find({ _id: { $in: ids } });

    if (existingAssets.length === 0) {
      return res.status(404).json({ message: "No matching assets found" });
    }

    const deletedAssets = await Asset.find({ _id: { $in: ids } });

    await Asset.deleteMany({ _id: { $in: ids } });

    await AssetLog.create({
      action: "MULTIDELETE",
      userID: user.id,
      targetProduct: deletedAssets.map((asset) => asset._id),
      userEmail: user.email,
      userRole: user.role,
      productName: deletedAssets.map((asset) => asset.productname),
      productSN: deletedAssets.map((asset) => asset.serialnumber),
    });

    await emitAssetLogs(Asset);
    await emitAssetSummary(Asset);

    res
      .status(200)
      .json({ message: `${existingAssets.length} assets have been deleted` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAssetSummary = async (req, res) => {
  try {
    const summary = await Asset.aggregate([
      {
        $group: {
          _id: "$producttype",
          total: { $sum: 1 },
          available: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$status", "just_added"] },
                    { $eq: ["$condition", "Good"] },
                  ],
                },
                1,
                0,
              ],
            },
          },
          distributed: {
            $sum: {
              $cond: [{ $eq: ["$status", "Distributed"] }, 1, 0],
            },
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAssets,
  addAsset,
  updateAsset,
  deleteAsset,
  deleteMultipleAssets,
  getAssetSummary,
};
