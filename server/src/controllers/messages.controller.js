const Chat = require("../models/chat.model");
const Message = require("../models/message.model");

const sendMessage = async (req, res) => {
  try {
    const { content, chatId } = req.body;
    if (!chatId) {
      return res
        .status(400)
        .json({ message: "Chat id missing in request body" });
    }
    const verifyChatId = await Chat.findById(chatId);
    if (!verifyChatId) {
      return res.status(404).json({ message: "Chat doesn't exist" });
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
    return res.status(501).json({ message: error.message });
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
    return res.status(501).json({ message: error.message });
  }
};

const readMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const markAsRead = await Message.findByIdAndUpdate(messageId, {
      unread: false
    });
    markAsRead && res.status(200).json({ message: "Message has been read" });
    res.end();
  } catch (error) {
    return res.status(501).json({ message: error.message });
  }
};
module.exports = {
  sendMessage,
  allMessages,
  readMessage
};
