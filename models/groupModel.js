const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    nameGroup: {
      type: String,
      trim: true,
      maxlength: 25,
      required: true,
      unique: true,
    },
    ArrayUser: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    maZoom: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("group", groupSchema);
