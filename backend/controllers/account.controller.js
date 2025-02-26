const Account = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

//functions

const getAccount = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await Account.findById(id);
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addAccount = async (req, res) => {
  try {
    const { email, password, role, firstname, lastname, phone } = req.body;

    const existingAccount = await Account.findOne({ email });
    if (existingAccount) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const account = await Account.create({
      email,
      password: hashedPassword,
      role,
      firstname,
      lastname,
      phone
    });

    res.status(201).json({ message: "Account created successfully!", account });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAccount = async (req, res) => {
  try {
    const { id } = req.params;

    const account = await Account.findByIdAndUpdate(id, req.body);

    if (!account) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedAccount = await Account.findById(id);

    res.status(200).json(updatedAccount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await Account.findByIdAndDelete(id);

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    const accounts = await Account.find();

    res.status(200).json({ message: `${account.email} account is deleted` });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Account.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
  getAccount,
  getSingleAccount,
  addAccount,
  updateAccount,
  deleteAccount,
  login,
};
