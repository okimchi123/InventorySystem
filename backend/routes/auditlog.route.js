const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");
const {getUserAuditLogs} = require("../controllers/UserAuditLog.controller")
const {getAssetAuditLogs} = require("../controllers/assetAuditLog.controller");

const router = express.Router();

router.get("/", authenticateToken, getUserAuditLogs);

router.get("/assetLog", authenticateToken, getAssetAuditLogs);

module.exports = router;