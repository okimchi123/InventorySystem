const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http"); 
const { Server } = require("socket.io"); 
const authRoutes = require("./routes/account.route"); 
const adminRoutes = require("./routes/admin.route");
const auditLogRoutes = require("./routes/auditlog.route");
const AuditLog = require("./models/accountAudit"); 

dotenv.config();
const app = express();
const server = http.createServer(app); 


const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api", adminRoutes);
app.use("/api/audit-logs", auditLogRoutes);


io.emitAuditLogs = async () => {
  try {
    const logs = await AuditLog.find()
      .populate("performedBy", "email role")
      .populate("targetUser", "status")
      .sort({ createdAt: -1 });

    io.emit("updateAuditLogs", logs); // Broadcast updates
  } catch (error) {
    console.error("Error fetching audit logs:", error);
  }
};

io.on("connection", (socket) => {
  console.log("A client connected");

  socket.on("disconnect", () => {
    console.log("A client disconnected");
  });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.get("/", (req, res) => {
  res.send("Inventory System API is running...");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = { io };

