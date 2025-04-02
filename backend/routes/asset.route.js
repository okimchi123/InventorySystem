const express = require("express");
const multer = require("multer");
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
    getUserHandlingAssets,
} = require("../controllers/asset.controller")
const { exportAssets, importAssets } = require("../controllers/asssetExcel.controller")
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", getAssets);

router.post("/", authenticateToken, addAsset);

router.delete("/delete-multiple", authenticateToken, deleteMultipleAssets);

router.put("/:id", authenticateToken, updateAsset);

router.delete("/:id", authenticateToken, deleteAsset);

router.get("/summary", getAssetSummary);

router.get("/asset-stats", getAssetStatistics);

router.get("/asset-trends", getAssetTrends);

router.get("/handling-assets", authenticateToken, getUserHandlingAssets);

router.get("/export-assets", exportAssets);
router.post("/import-assets", upload.single("file"), importAssets);


module.exports = router;