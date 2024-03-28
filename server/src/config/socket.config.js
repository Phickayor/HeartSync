const socketIo = require("socket.io");
const socketConfig = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: "*"
    }
  });

  // Socket.IO connection handling
  io.on("connection", (socket) => {
    console.log("A user connected");
    socket.on("setup", (id) => {
      socket.join(id);
      socket.emit("connected");
    });
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
    +(
      // Example event handling
      socket.on("chat message", (msg) => {
        console.log("message: " + msg);
        io.emit("chat message", msg);
      })
    );
  });
};

module.exports = socketConfig;
