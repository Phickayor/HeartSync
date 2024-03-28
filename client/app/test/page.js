"use client";
import baseUrl from "@/config/server";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
function page() {
  var socket;
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const sendMessage = (e) => {
    e.preventDefault();
    console.log("yayy");
    socket.emit("chat message", newMessage);
  };
  useEffect(() => {
    //Creating Connection
    socket = io(baseUrl);
    // socket.emit("setup",userId)
    socket.on("connected", () => {
      setSocketConnected(true);
    });
  }, []);
  return (
    <div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          onChange={(e) => setNewMessage(e.target.value)}
          required
        />
        <button type="submit">send</button>
      </form>
    </div>
  );
}

export default page;
