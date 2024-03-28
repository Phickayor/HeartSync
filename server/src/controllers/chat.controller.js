const chatModel = require("../models/chat.model");
const profileModel = require("../models/profile.model");
const messageModel = require("../models/message.model");
const getChats = async (req, res) => {
  try {
    const { userId } = req.params;
    const { chats } = await profileModel.findById(userId);
    const allChats = await Promise.all(
      chats.map(async (chatId) => {
        var chat = await chatModel.findById(chatId);
        return chat;
      })
    );
    res.status(200).json({ success: true, allChats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const getAChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const chat = await chatModel.findById(chatId);
    res.status(200).json({ success: true, chat });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createChat = async (req, res, next) => {
  try {
    const { senderId, receiverId } = req.body;

    const sender = await profileModel.findById(senderId);
    const receiver = await profileModel.findById(receiverId);
    const chat = await chatModel.findOne({
      parties: [senderId, receiverId] || [receiverId, senderId]
    });
    var chatId;
    if (!chat) {
      const newChat = await chatModel.create({
        sender: senderId,
        receiver: receiverId,
        parties: [senderId, receiverId]
      });
      await newChat.save();
      await profileModel.findByIdAndUpdate(senderId, {
        chats: [...sender.chats, newChat]
      });
      await profileModel.findByIdAndUpdate(receiverId, {
        chats: [...receiver.chats, newChat]
      });
      chatId = newChat._id;
    } else {
      chatId = chat._id;
    }
    req.body.chatId = chatId;
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const getUnreadChats = async (req, res) => {
  try {
    const { chatId } = req.params;
    var chat = await chatModel.findById(chatId);
    var unread = [];
    await Promise.all(
      chat.messages.map(async (messageId) => {
        var msg = await messageModel.find({
          _id: messageId,
          readByReceiver: false
        });
        msg.length > 0 ? unread.push(msg) : null;
      })
    );
    res.status(200).json({ success: true, unread });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createChat,
  getChats,
  getAChat,
  getUnreadChats
};
