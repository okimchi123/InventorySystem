const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");

const {
    distributeAsset,
    getDistributeLogs,
} = require("../controllers/distribute.controller")

const router = express.Router();

router.get("/distributeLogs", authenticateToken, getDistributeLogs);
router.post("/", authenticateToken, distributeAsset);

module.exports = router;