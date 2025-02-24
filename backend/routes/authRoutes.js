const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const dotenv = require("dotenv");

dotenv.config();
const router = express.Router();

// User Registration
router.post("/register", async (req, res) => {
  const { email, password, role } = req.body;

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: "User already exists" });

  // Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save User
  const newUser = new User({ email, password: hashedPassword, role });
  await newUser.save();

  res.status(201).json({ message: "User registered successfully" });
});

// User Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  // Generate JWT
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.json({ token, role: user.role });
});

router.post("/" ,async (req, res) => {
  try {
    const accounts = await User.find();
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
