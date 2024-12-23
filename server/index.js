const http = require("http");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const compression = require("compression");
const bodyParser = require("body-parser");
const authRouter = require("./src/routes/auth.route");
const connectToDb = require("./src/config/db.config");
const userRouter = require("./src/routes/user.route");
const socketConfig = require("./src/config/socket.config");
const chatRouter = require("./src/routes/chat.route");
const messageRouter = require("./src/routes/message.route");
const matchRouter = require("./src/routes/matches.route");
const app = express();
connectToDb();
app.use(morgan("dev"));
app.use(cors());
app.use(compression());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/chat", chatRouter);
app.use("/message", messageRouter);
app.use("/matches", matchRouter);
const server = http.createServer(app);
// Configure Socket.IO
socketConfig(server);

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
