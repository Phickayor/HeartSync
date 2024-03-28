const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "profile"
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "profile"
  },
  parties: {
    type: [mongoose.Schema.Types.ObjectId]
  },
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "messages" }]
});

const chatModel = mongoose.model("chat", chatSchema);
module.exports = chatModel;
