const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");

const {
    distributeAsset,
    getDistributeLogs,
    getUsersWithAssets,
    getUserDistributeLogs,
    getUsersWithAssetsDistributedByUser,
    requestReturn,
} = require("../controllers/distribute.controller")

const router = express.Router();

router.get("/distributeLogs", authenticateToken, getDistributeLogs);
router.post("/", authenticateToken, distributeAsset);
router.get("/getUserWithAssets", authenticateToken, getUsersWithAssets);
router.get("/getUserDistribute", authenticateToken, getUserDistributeLogs);
router.get("/users-with-assets-distributed", authenticateToken, getUsersWithAssetsDistributedByUser);
router.put("/request-return", requestReturn);


module.exports = router;