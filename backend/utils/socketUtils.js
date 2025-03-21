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
async function emitUserLogs(Account) {
  try {
    const logs = await Account.find();
    io.emit("updateUserLogs", logs);
    if (io) {
      io.emit("updateUserLogs", logs);
    } else {
      console.error("Socket.io not initialized");
    }
  } catch (error) {
    console.error("Error emitting audit logs:", error);
  }
}

async function emitAssetLogs(Asset) {
  try {
    const logs = await Asset.find();
    io.emit("updateAssetLogs", logs);
    if (io) {
      io.emit("updateAssetLogs", logs);
    } else {
      console.error("Socket.io not initialized");
    }
  } catch (error) {
    console.error("Error emitting audit logs:", error);
  }
}

async function emitAssetSummary(Asset) {
  try {
    const summary = await Asset.aggregate([
      {
        $group: {
          _id: "$producttype",
          total: { $sum: 1 },
          available: {
            $sum: {
              $cond: [{ $eq: ["$status", "just_added"] }, 1, 0],
            },
          },
          distributed: {
            $sum: {
              $cond: [{ $eq: ["$status", "Distributed"] }, 1, 0],
            },
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    if (io) {
      io.emit("updateAssetSummary", summary);
    } else {
      console.error("Socket.io not initialized");
    }
  } catch (error) {
    console.error("Error emitting asset summary:", error);
  }
}

async function emitAssetStatistics(Asset) {
  try {
    const totalAssets = await Asset.countDocuments();
    const totalAvailable = await Asset.countDocuments({ status: "just_added", condition: "Good" });
    const totalDistributed = await Asset.countDocuments({ status: "Distributed" });
    const totalBroken = await Asset.countDocuments({ condition: "Broken" });
    const totalScrap = await Asset.countDocuments({ condition: "Scrap" });

    const statistics = {
      totalAssets,
      totalAvailable,
      totalDistributed,
      totalBroken,
      totalScrap
    };

    if (io) {
      io.sockets.emit("updateAssetStatistics", statistics); // Broadcast to all clients
    } else {
      console.error("Socket.io not initialized");
    }
  } catch (error) {
    console.error("Error emitting asset statistics:", error);
  }
}

module.exports = { setIO, emitAuditLogs, emitUserLogs, emitAssetLogs, emitAssetSummary, emitAssetStatistics };