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
    ArrayUser: [],
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    maZoom: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    posts: [{ type: mongoose.Types.ObjectId, ref: "post" }],
    comments: [{ type: mongoose.Types.ObjectId, ref: "comment" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("group", groupSchema);
