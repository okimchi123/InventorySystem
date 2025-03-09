const Asset = require("../models/Asset");
const {emitAssetLogs} = require("../utils/socketUtils")

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
    const {productname, producttype, serialnumber, description, condition} = req.body;

    const existingAsset = await Asset.findOne({ serialnumber });
    
    if (existingAsset) {
      return res.status(400).json({ message: "Serial Number is already used" });
    }

    const asset = await Asset.create({ productname, producttype, serialnumber, description, condition});
    
    await emitAssetLogs(Asset);

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

    res.status(200).json({ message: `${asset.productname} asset is deleted` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    getAssets,
    addAsset,
    updateAsset,
    deleteAsset,
}