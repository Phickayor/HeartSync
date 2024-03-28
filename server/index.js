const express = require("express");
const cors = require("cors");
const http = require("http");
const app = express();
const auth_route = require("./src/routes/auth.route");
const profile_route = require("./src/routes/profile.route");
const pictures_route = require("./src/routes/pictures.route");
const message_route = require("./src/routes/message.route");
const chat_route = require("./src/routes/chat.route");
const connectToDb = require("./src/config/db.config");
const bodyParser = require("body-parser");
const socketConfig = require("./src/config/socket.config");
connectToDb();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Welcome to the backend of BabyBoo");
});

app.use("/auth", auth_route);
app.use("/profile", profile_route);
app.use("/pictures", pictures_route);
app.use("/message", message_route);
app.use("/chat", chat_route);

const server = http.createServer(app);

// Configure Socket.IO
socketConfig(server);

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
