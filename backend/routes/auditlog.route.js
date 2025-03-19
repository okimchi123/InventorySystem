const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");
const {getUserAuditLogs} = require("../controllers/UserAuditLog.controller")
const {getAssetAuditLogs, getAssetConditionLogs} = require("../controllers/assetAuditLog.controller");

const router = express.Router();

router.get("/", authenticateToken, getUserAuditLogs);

router.get("/assetLog", authenticateToken, getAssetAuditLogs);

router.get("/assetConditionLog", authenticateToken, getAssetConditionLogs);

module.exports = router;