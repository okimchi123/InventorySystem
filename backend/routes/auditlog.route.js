const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");
const {getUserAuditLogs} = require("../controllers/UserAuditLog.controller")


const router = express.Router();

router.get("/", authenticateToken, getUserAuditLogs);

module.exports = router;