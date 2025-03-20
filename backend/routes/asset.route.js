const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");
const {
    getAssets,
    addAsset,
    updateAsset,
    deleteAsset,
    deleteMultipleAssets,
    getAssetSummary,
    getAssetStatistics,
    getAssetTrends,
} = require("../controllers/asset.controller")

const router = express.Router();

router.get("/", getAssets);

router.post("/", authenticateToken, addAsset);

router.delete("/delete-multiple", authenticateToken, deleteMultipleAssets);

router.put("/:id", authenticateToken, updateAsset);

router.delete("/:id", authenticateToken, deleteAsset);

router.get("/summary", getAssetSummary);

router.get("/asset-stats", getAssetStatistics);

router.get("/asset-trends", getAssetTrends);

module.exports = router;