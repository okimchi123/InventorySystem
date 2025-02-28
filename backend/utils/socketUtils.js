let io;

function setIO(socketIO) {
  io = socketIO;
}

async function emitAuditLogs(AuditLog) {
  try {
    const logs = await AuditLog.find()
              .populate("performedBy", "email role")
              .populate("targetUser", "status")
              .sort({ createdAt: -1 });
              io.emit("updateAuditLogs", logs);
    if (io) {
      io.emit("updateAuditLogs", logs);
    } else {
      console.error("Socket.io not initialized");
    }
  } catch (error) {
    console.error("Error emitting audit logs:", error);
  }
}

module.exports = { setIO, emitAuditLogs };