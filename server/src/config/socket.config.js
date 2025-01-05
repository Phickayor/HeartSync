const socketIo = require("socket.io");
const users = new Map(); // Store userId -> socketId mapping

const getSocketByUserId = (userId) => {
  return users.get(userId);
};

const socketConfig = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: "*"
    }
  });

  io.on("connection", (socket) => {
    socket.on("setup", (userId) => {
      socket.join(userId);
      users.set(userId, socket.id);
      socket.emit("connected");
      console.log("Setup successfully");
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
    socket.on("join chat", (room) => {
      socket.join(room);
      console.log("User Joined Room: " + room);
    });

    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("new message", (newMessageReceived) => {
      let chat = newMessageReceived.chat;
      if (!chat.users) return console.log("chat.users not defined");
      chat.users.forEach((user) => {
        if (user._id == newMessageReceived.sender._id) return;
        try {
          socket.to(user._id).emit("message received", newMessageReceived);
        } catch (error) {
          console.log(error.message);
        }
      });
    });
    socket.on("new notification", ({ receiverId }) => {
      const receiverSocket = getSocketByUserId(receiverId);
      if (receiverSocket) {
        console.log("Present");
        io.to(receiverSocket).emit("new notification");
      }
    });
  });
};

module.exports = socketConfig;
