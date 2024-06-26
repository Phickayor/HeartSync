const socketIo = require("socket.io");
const socketConfig = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: "*"
    }
  });

  io.on("connection", (socket) => {
    socket.on("setup", (userData) => {
      socket.join(userData._id);
      socket.emit("connected");
      console.log("Setup successfully");
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
  });
};

module.exports = socketConfig;
