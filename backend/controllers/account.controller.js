const Account = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const AuditLog = require("../models/accountAudit.js");
const {emitAuditLogs, emitUserLogs} = require("../utils/socketUtils.js")

dotenv.config();

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
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: Admin ID missing" });
    }

    const adminId = req.user.id;
    const { email, role, firstname, lastname, phone } = req.body;

    const admin = await Account.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const existingAccount = await Account.findOne({ email });
    if (existingAccount) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const account = await Account.create({ email, role, firstname, lastname, phone, status: "inactive" });

    await AuditLog.create({
      action: "CREATE",
      performedBy: adminId,
      targetUser: account._id,
      userEmail: email,
      userRole: role,
      adminEmail: admin.email,
    });

    await emitAuditLogs(AuditLog);
    await emitUserLogs(Account);

    res.status(201).json({ message: "Account created successfully!", account });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addAdminAccount = async (req, res) => {
  try {
    const { email, password, firstname, lastname, phone, role} = req.body;

    const existingAccount = await Account.findOne({ email });
    if (existingAccount) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const adminAccount = await Account.create({
      email,
      password: hashedPassword, 
      role, 
      firstname,
      lastname,
      phone,
    });

    res.status(201).json({ message: "Admin account created successfully!", adminAccount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const adminId = req.user.id;

    
    const existingAccount = await Account.findById(id);

    if (!existingAccount) {
      return res.status(404).json({ message: "Account not found" });
    }

    const account = await Account.findByIdAndUpdate(id, req.body, { new: true });

   
    const admin = await Account.findById(adminId);

    if (!admin) {
        return res.status(404).json({message: "Admin user not found."})
    }

    await AuditLog.create({
      action: "UPDATE",
      performedBy: adminId,
      targetUser: account._id,
      userEmail: existingAccount.email, 
      userRole: existingAccount.role,   
      adminEmail: admin.email,
    });

    await emitAuditLogs(AuditLog);
    await emitUserLogs(Account);

    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const adminId = req.user.id; 
    const account = await Account.findByIdAndDelete(id);

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }


    await AuditLog.create({
      action: "DELETE_USER",
      performedBy: adminId,
      targetUser: account._id,
      details: `Admin deleted user ${account.firstname} ${account.lastname} (${account.email})`,
    });

    res.status(200).json({ message: `${account.email} account is deleted` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Account.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    if (user.status === "inactive") {
      user.status = "active";
      await user.save();
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

const logout = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await Account.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.status = "inactive";
    await user.save();

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

module.exports = {
  getAccount,
  getSingleAccount,
  addAccount,
  updateAccount,
  deleteAccount,
  login,
  logout,
  addAdminAccount,
};
