const Asset = require("../models/Asset");

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
    const {productname, producttype, serialnumber, description, status} = req.body;

    const asset = await Asset.create({ productname, producttype, serialnumber, description, status:"Pending" });
    res.status(201).json({ message: "Asset created successfully!", asset });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    getAssets,
    addAsset,
}