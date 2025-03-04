const express = require("express");
const {
    getAssets,
    addAsset,
    updateAsset,
    deleteAsset,
} = require("../controllers/asset.controller")

const router = express.Router();

router.get("/", getAssets);

router.post("/", addAsset);

router.put("/:id", updateAsset);

router.delete("/:id", deleteAsset);

module.exports = router;