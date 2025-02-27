const express = require("express");
const Account = require("../models/User.js");
const {
  getAccount,
  getSingleAccount,
  addAccount,
  updateAccount,
  addAdminAccount,
  deleteAccount,
  login,
} = require("../controllers/account.controller");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

//read users
router.get("/", authenticateToken, getAccount);
router.get("/:id", authenticateToken, getSingleAccount);

//create user
router.post("/", authenticateToken, addAccount);
router.post("/admin", addAdminAccount);

//update user
router.put("/:id", authenticateToken, updateAccount);

//delete user
router.delete("/:id", authenticateToken, deleteAccount);

//login user
router.post("/login", login);

module.exports = router;
