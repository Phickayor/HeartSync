const chatModel = require("../models/chat.model");
const messageModel = require("../models/message.model");

const createMessage = async (req, res) => {
  console.log("dgas");
  const { senderId, receiverId, content, chatId } = req.body;
  try {
    const chat = await chatModel.findById(chatId);
    const message = await messageModel.create({
      sender: senderId,
      content,
      chat: chatId,
      receiver: receiverId
    });
    await message.save();
    await chatModel.findByIdAndUpdate(chatId, {
      messages: [...chat.messages, message._id]
    });
    res
      .status(200)
      .json({ success: true, message: "Message created and chat updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const readMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const message = await messageModel.findByIdAndUpdate(messageId, {
      readByReceiver: true
    });
    await message.save();
    res
      .status(200)
      .json({ success: true, message: "This message has been read" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const getAllMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const chat = await chatModel.findById(chatId);

    res.status(200).json({ success: true, messages: chat.messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const getAMessage = async (req, res) => {
  try {
    var message = await messageModel.findById(req.params.messageId);
    res.status(200).json({ success: true, message });
  } catch (error) {
    res.status(501).json({ success: false, error: error.message });
  }
};
const getLastMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const chat = await chatModel.findById(chatId);
    const messages = chat.messages;
    res
      .status(200)
      .json({ success: true, lastMessage: messages[messages.length - 1] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = {
  createMessage,
  readMessage,
  getAllMessages,
  getAMessage,
  getLastMessage
};
