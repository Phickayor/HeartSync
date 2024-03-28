const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "profile"
    },
    content: { type: String, required: true },
    chat: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Chat" },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "profile",
      required: true
    },
    readByReceiver: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const messageModel = mongoose.model("messages", messageSchema);
module.exports = messageModel;
