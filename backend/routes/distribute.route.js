const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");

const {
    distributeAsset,
    getDistributeLogs,
    getUsersWithAssets,
    getUserDistributeLogs,
} = require("../controllers/distribute.controller")

const router = express.Router();

router.get("/distributeLogs", authenticateToken, getDistributeLogs);
router.post("/", authenticateToken, distributeAsset);
router.get("/getUserWithAssets", authenticateToken, getUsersWithAssets);
router.get("/getUserDistribute", authenticateToken, getUserDistributeLogs);
module.exports = router;