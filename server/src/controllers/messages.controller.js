const Chat = require("../models/chat.model");
const Message = require("../models/message.model");

const sendMessage = async (req, res) => {
  try {
    const { content, chatId } = req.body;
    if (!chatId) {
      return res.status(400).json({ error: "Chat id missing in request body" });
    }
    const verifyChatId = await Chat.findById(chatId);
    if (!verifyChatId) {
      return res.status(404).json({ error: "Chat doesn't exist" });
    }
    let message = await Message.create({
      sender: req.user._id,
      content,
      chat: chatId,
      unread: true
    });
    message = await message.populate("sender", "userName profilePicture");
    message = await message.populate("chat");
    message = await message.populate("chat.users", "userName profilePicture");
    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message
    });

    res.status(200).json({ newMessage: message });
  } catch (error) {
    return res.status(501).json({ error: error.message });
  }
};

const allMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name profilePicture")
      .populate("chat")
      .populate("chat.users", "name profilePicture");
    var receiver;
    messages.length > 0 &&
      messages[0].chat.users.map((user) => {
        if (user == req.user._id) {
          receiver = user;
        }
      });

    await Message.updateMany(
      { chat: req.params.chatId },
      { $set: { unread: false, sender: receiver } }
    );
    res.status(200).json({ messages });
  } catch (error) {
    return res.status(501).json({ error: error.message });
  }
};

const readAllMessagesInChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const readMessages = await Message.updateMany(
      { chat: chatId },
      { $set: { unread: false } }
    );
    if (readMessages) {
      return res.status(200).json({ message: "Messages has been read" });
    }
  } catch (error) {
    return res.status(501).json({ error: error.message });
  }
};
module.exports = {
  sendMessage,
  allMessages,
  readAllMessagesInChat
};
