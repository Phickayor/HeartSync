const Chat = require("../models/chat.model");
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
    var userIds = [req.user._id, userId];
    if (!verifyUserId) {
      return res.status(404).json({ message: "User not found" });
    }
    const chat = await Chat.findOne({ users: { $all: userIds } });
    if (!chat) {
      const createChat = await Chat.create({ users: userIds });
      res.status(200).json({ chat: createChat });
    } else {
      res.status(200).json({ chat });
    }
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};

const fetchChats = async (req, res) => {
  try {
    const userChats = await Chat.find({
      users: { $in: [req.user._id] }
    })
      .sort({ updatedAt: -1 })
      .populate("users", "userName profilePicture")
      .populate("latestMessage", "content");
    if (userChats) {
      res.status(200).json({ userChats });
    } else {
      res.status(404).json({ userChats });
    }
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};

module.exports = {
  accessChat,
  fetchChats
};
