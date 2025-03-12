const express = require("express");
const {
    getAssets,
    addAsset,
    updateAsset,
    deleteAsset,
    deleteMultipleAssets,
    getAssetSummary,
} = require("../controllers/asset.controller")

const router = express.Router();

router.get("/", getAssets);

router.post("/", addAsset);

router.delete("/delete-multiple", deleteMultipleAssets);

router.put("/:id", updateAsset);

router.delete("/:id", deleteAsset);

router.get("/summary", getAssetSummary);

module.exports = router;