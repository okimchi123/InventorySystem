const Asset = require("../models/Asset");
const {emitAssetLogs, emitAssetSummary} = require("../utils/socketUtils")

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
    const {productname, producttype, serialnumber, description, condition, reason} = req.body;

    const existingAsset = await Asset.findOne({ serialnumber });
    
    if (existingAsset) {
      return res.status(400).json({ message: "Serial Number is already used" });
    }

    const asset = await Asset.create({ productname, producttype, serialnumber, description, condition, reason});
    
    await emitAssetLogs(Asset);
    await emitAssetSummary(Asset);

    res.status(201).json({ message: "Asset created successfully!", asset });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAsset = async (req, res) => {
  try {
    const { id } = req.params;

    const existingAsset = await Asset.findById(id);

    if (!existingAsset) {
      return res.status(404).json({ message: "Asset not found" });
    }

    const asset = await Asset.findByIdAndUpdate(id, req.body, { new: true });

    await emitAssetLogs(Asset);

    res.status(200).json(asset);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAsset = async (req, res) => {
  try {
    const { id } = req.params;

    const existingAsset = await Asset.findById(id);

    if (!existingAsset) {
      return res.status(404).json({ message: "Asset not found" });
    }

    const asset = await Asset.findByIdAndDelete(id);

    await emitAssetLogs(Asset);
    await emitAssetSummary(Asset);

    res.status(200).json({ message: `${asset.productname} asset is deleted` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMultipleAssets = async (req, res) => {
  try {
    const { ids } = req.body; // Expecting an array of asset IDs

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "No assets selected for deletion" });
    }

    const existingAssets = await Asset.find({ _id: { $in: ids } });

    if (existingAssets.length === 0) {
      return res.status(404).json({ message: "No matching assets found" });
    }

    await Asset.deleteMany({ _id: { $in: ids } });

    await emitAssetLogs(Asset);
    await emitAssetSummary(Asset);

    res.status(200).json({ message: `${existingAssets.length} assets have been deleted` });
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
                    { $eq: ["$condition", "Good"] }
                  ] 
                }, 
                1, 
                0
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
}