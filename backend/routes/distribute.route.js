const express = require("express");
const {
    distributeAsset,
    getUserAsset,
    getAssetUser,
    getAllUserWithAssets,
    getAllDistributedAssets,
} = require("../controllers/distribute.controller")

const router = express.Router();

router.get("/user/:id", getUserAsset);
router.get("/user", getAllUserWithAssets);

router.get("/asset/:id", getAssetUser);
router.get("/asset", getAllDistributedAssets);

router.post("/", distributeAsset);


module.exports = router;