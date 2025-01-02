const Chat = require("../models/chat.model");
const Message = require("../models/message.model");
const User = require("../models/user.model");

const accessChat = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res
        .status(400)
        .json({ message: "User id missing in request body" });
    }
    const verifyUserId = await User.findById(userId);
    let userIds = [req.user._id, userId];
    if (!verifyUserId) {
      return res.status(404).json({ error: "User not found" });
    }
    const chat = await Chat.findOne({ users: { $all: userIds } });
    if (!chat) {
      const createChat = await Chat.create({ users: userIds });
      res.status(200).json({ chat: createChat });
    } else {
      res.status(200).json({ chat });
    }
  } catch (error) {
    res.status(501).json({ "error": error.message });
  }
};

const fetchChats = async (req, res) => {
  try {
    let chats = [];
    const userChats = await Chat.find({
      users: { $in: [req.user._id] }
    })
      .sort({ updatedAt: -1 })
      .populate("users", "userName profilePicture")
      .populate("latestMessage", "content");
    await Promise.all(
      userChats.map(async (chat) => {
        const messagesWithId = await Message.find({
          chat: chat._id
        });
        let unread = messagesWithId.filter((message) => message.unread == true);
        let combo = { chat, unread };
        chats.push(combo);
      })
    );
    if (chats) {
      res.status(200).json({ chats });
    }
    res.end();
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};

module.exports = {
  accessChat,
  fetchChats
};
