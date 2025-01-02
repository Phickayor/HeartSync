import { io } from "socket.io-client";
import baseUrl from "./server";
import { UserContext } from "@/contexts/UserContext";

const socket = io(baseUrl);

const userId = UserContext.userState?._id
// Handle logout
export const handleLogoutFromSocket = () => {
  if (userId) {
    socket.emit("user disconnected", userId); // Custom event to notify the server
    socket.disconnect(); // Close the socket connection
  }
};
export const createConnection= () => {
  if (userId) {
    socket.emit("setup", userId); // Custom event to notify the server
    socket.disconnect(); // Close the socket connection
  }
};

// Notify the server when the user closes the app
// window.addEventListener("beforeunload", () => {
//   if (userId) {
//     socket.emit("user disconnected", userId);
//     socket.disconnect();
//   }
// });
