const express = require("express");
const Account = require("../models/User.js");
const {
  getAccount,
  getSingleAccount,
  addAccount,
  updateAccount,
  deleteAccount,
  login,
} = require("../controllers/account.controller");
const router = express.Router();

//read users
router.get("/", getAccount);
router.get("/:id", getSingleAccount);

//create user
router.post("/", addAccount);

//update user
router.put("/:id", updateAccount);

//delete user
router.delete("/:id", deleteAccount);

//login user
router.post("/login", login);

module.exports = router;
