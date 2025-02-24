const express = require("express");
const Admin = require("../models/User.js"); 
const authenticateToken = require("../middleware/authMiddleware.js"); 

const router = express.Router();

router.get("/admin", authenticateToken, async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id); 
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    res.json({ name: admin.name, email: admin.email });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;