const socketIo = require("socket.io");
const users = new Map();

const getSocketByUserId = (userId) => {
  console.log("Users ", users);
  return users.get(userId);
};

const setUserSocketAndChat = (userId, socketId, chatId) => {
  users.set(userId, { socketId, chatId });
  console.log("Users ", users);
};

const deleteUser = (userId) => {
  users.delete(userId);
};

const updateUserChatId = (userId, socketId, chatId) => {
  deleteUser(userId);
  setUserSocketAndChat(userId, socketId, chatId);
};

const socketConfig = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: "*"
    }
  });

  io.on("connection", (socket) => {
    socket.on("setup", (userId) => {
      setUserSocketAndChat(userId, socket.id, null);
      // socket.emit("connected", socket);
    });
    socket.on("disconnect", () => {
      for (const [userId, socketId] of users.entries()) {
        if (socketId === socket.id) {
          users.delete(userId);
          console.log(`User ${userId} disconnected`);
          break;
        }
      }
    });
    socket.on("join chat", (userId, chatId) => {
      updateUserChatId(userId, socket.id, chatId);
      socket.join(chatId);
      console.log("Joined chat " + chatId);
    });

    socket.on("typing", (receiverId, chat) => {
      const receiverSocket = getSocketByUserId(receiverId);
      if (receiverSocket) {
        socket.in(chat).emit("typing");
      }
    });
    socket.on("notifications", (receiverId) => {
      const receiverSocket = getSocketByUserId(receiverId);
      if (receiverSocket) {
        io.to(receiverSocket.socketId).emit("notifications");
      }
    });
    socket.on("new message", (newMessageReceived) => {
      let chat = newMessageReceived.chat;
      let receiver = chat.users.filter(
        (user) => user._id != newMessageReceived.sender._id
      );
      const receiverSocket = getSocketByUserId(receiver[0]._id);
      console.log("Receiver ", receiverSocket);
      if (receiverSocket) {
        io.to(receiverSocket.socketId).emit(
          "message received",
          newMessageReceived
        );
      }
    });
  });
};

module.exports = socketConfig;
