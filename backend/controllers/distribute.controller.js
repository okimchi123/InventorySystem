const Asset = require("../models/Asset");
const Account = require("../models/User.js");
const {emitAssetLogs, emitAssetSummary} = require("../utils/socketUtils")
const mongoose = require("mongoose");

const distributeAsset = async (req, res) => {
  try {
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
          status: "Distributed",
        },
      }
    );

    user.handlingAssets.push(...assetIds);
    await user.save();

    await emitAssetLogs(Asset);
    await emitAssetSummary(Asset);

    res.status(200).json({ message: "Assets successfully distributed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserAsset = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const user = await Account.findById(userId).populate({
      path: "handlingAssets",
      select: "productname producttype serialnumber status condition",
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.handlingAssets || user.handlingAssets.length === 0) {
      return res.status(200).json({ message: "User has no assigned assets" });
    }

    res.status(200).json({ handlingAssets: user.handlingAssets });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllUserWithAssets = async (req, res) => {
  try {
    const users = await Account.find({
      handlingAssets: { $exists: true, $ne: [] },
    })
      .populate({
        path: "handlingAssets",
        select: "productname producttype serialnumber status condition",
      })
      .select("firstname lastname email phone role status handlingAssets")
      .lean();

    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ message: "No users with assigned assets found" });
    }

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAssetUser = async (req, res) => {
  try {
    const { assetId } = req.params;

    if (!assetId || !mongoose.Types.ObjectId.isValid(assetId.trim())) {
      return res.status(400).json({ message: "Invalid asset ID format" });
    }

    const asset = await Asset.findById(assetId).populate({
      path: "distributedTo",
      select: "firstname lastname email phone role",
    });

    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }

    if (!asset.distributedTo) {
      return res
        .status(200)
        .json({ message: "Asset is not distributed to any user" });
    }

    res.status(200).json({ distributedTo: asset.distributedTo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllDistributedAssets = async (req, res) => {
  try {
    const assets = await Asset.find({
      distributedTo: { $exists: true, $ne: null },
    })
      .populate({
        path: "distributedTo",
        select: "firstname lastname email role", // Fetch user details
      })
      .select(
        "productname producttype serialnumber status condition distributedTo"
      )
      .lean();

    if (!assets || assets.length === 0) {
      return res.status(404).json({ message: "No distributed assets found" });
    }

    res.status(200).json({ assets });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  distributeAsset,
  getUserAsset,
  getAssetUser,
  getAllUserWithAssets,
  getAllDistributedAssets,
};
