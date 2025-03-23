const Account = require("../models/User.js");
const TokenBlacklist = require("../models/TokenBlacklist.js")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const AuditLog = require("../models/accountAudit.js");
const {emitAuditLogs, emitUserLogs} = require("../utils/socketUtils.js")

dotenv.config();

const sendPasswordSetupEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASSWORD }
  });

  const link = `http://localhost:5173/set-password?token=${token}`

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Set Your Password",
    html: `<p>Click <a href="${link}">here</a> to set your password. This link expires in 1 hour.</p>`
  });
};
const verifyToken = async (req, res) => {
  const { token } = req.body;

  try {
    const blacklistedToken = await TokenBlacklist.findOne({ token });
    if (blacklistedToken) {
      return res.status(400).json({ message: "Password setup is not available anymore." });
    }

    jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ message: "Token is valid." });

  } catch (error) {
    return res.status(400).json({ message: "Password setup is not available anymore." });
  }
};

const getAccount = async (req, res) => {
  try {
    const { role } = req.query;
    const query = role ? { role } : {}; 
    const accounts = await Account.find(query);
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

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    await sendPasswordSetupEmail(email, token);

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
const setPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    const blacklistedToken = await TokenBlacklist.findOne({ token });
    if (blacklistedToken) {
      return res.status(400).json({ message: "This link has already been used." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Account.findOne({ email: decoded.email });

    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    await TokenBlacklist.create({ token });

    return res.json({ message: "Password has been set successfully!" });

  } catch (error) {
    return res.status(400).json({ message: "Invalid or expired token." });
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

    const existingAccount = await Account.findById(id);

    const account = await Account.findByIdAndDelete(id);

    const admin = await Account.findById(adminId);

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    await AuditLog.create({
      action: "DELETE",
      performedBy: adminId,
      targetUser: account._id,
      userEmail: existingAccount.email, 
      userRole: existingAccount.role,   
      adminEmail: admin.email,
    });

    await emitAuditLogs(AuditLog);
    await emitUserLogs(Account);

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
    await emitUserLogs(Account);
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

    await emitUserLogs(Account);

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
  setPassword,
  verifyToken,
};
