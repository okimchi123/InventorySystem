const mongoose = require("mongoose");

const accountSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter your Email "],
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["Admin", "Moderator", "User"],
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      default: 0,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["inactive", "active", "deactivated"],
      default: "inactive",
    },
    handlingAssets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assets",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
