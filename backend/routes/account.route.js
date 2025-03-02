const express = require("express");
const Account = require("../models/User.js");
const {
  getAccount,
  getSingleAccount,
  addAccount,
  setPassword,
  updateAccount,
  addAdminAccount,
  deleteAccount,
  login,
  logout,
  verifyToken,
} = require("../controllers/account.controller");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

//read users
router.get("/", authenticateToken, getAccount);
router.get("/:id", authenticateToken, getSingleAccount);

//create user
router.post("/", authenticateToken, addAccount);
router.post("/set-password", setPassword);
router.post("/admin", addAdminAccount);

router.post("/verify-token", verifyToken);

//update user
router.put("/:id", authenticateToken, updateAccount);

//delete user
router.delete("/:id", authenticateToken, deleteAccount);

//login logout user
router.post("/login", login);
router.post("/logout", authenticateToken, logout);

module.exports = router;
