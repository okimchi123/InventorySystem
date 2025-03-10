const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
const authRoutes = require("./routes/account.route");
const assetRoutes = require("./routes/asset.route")
const adminRoutes = require("./routes/admin.route");
const auditLogRoutes = require("./routes/auditlog.route");
const distributeRoutes = require("./routes/distribute.route");
const {setIO} = require("./utils/socketUtils")

dotenv.config();
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
setIO(io);

io.on("connection", (socket) => {
  console.log("A client connected");

  socket.on("disconnect", () => {
    console.log("A client disconnected");
  });
});

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/asset", assetRoutes);
app.use("/api", adminRoutes);
app.use("/api/audit-logs", auditLogRoutes);
app.use("/api/distribute", distributeRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.get("/", (req, res) => {
  res.send("Inventory System API is running...");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = {io};


