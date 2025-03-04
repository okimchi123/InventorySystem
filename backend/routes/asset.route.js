const express = require("express");
const {
    getAssets,
    addAsset,
} = require("../controllers/asset.controller")

const router = express.Router();

//read assets
router.get("/", getAssets);

//add asset
router.post("/", addAsset);

module.exports = router;