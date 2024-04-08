"use client";
import baseUrl from "@/config/server";
import io from "socket.io-client";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineHeart, AiOutlinePicture } from "react-icons/ai";
import { GetSpecificUser } from "@/components/Controllers/UserController";
import { UserContext } from "@/contexts/UserContext";
import { AccessChat } from "@/components/Controllers/ChatController";
import {
  getAllMessages,
  sendMessage
} from "@/components/Controllers/MessageController";

const UserText = ({ image, content }) => {
  return (
    <div className="flex gap-2 justify-end">
      <div className="bg-[#1E1D1D] rounded-l-full rounded-tr-full flex py-4 px-6 cursor-pointer gap-5 max-w-96">
        <h3 className="text-white">{content}</h3>
      </div>
      <img src={image} className="w-12 h-12 rounded-full self-end" />
    </div>
  );
};
const OtherUserText = ({ image, content }) => {
  return (
    <div className="flex gap-2">
      <img src={image} className="w-12 h-12 self-end rounded-full" />
      <div className="bg-[#1E1D1D] rounded-r-full rounded-tl-full flex py-4 px-6 cursor-pointer gap-5 max-w-96">
        <h3 className="text-white">{content}</h3>
      </div>
    </div>
  );
};

function Message({ userId }) {
  const userContext = useContext(UserContext);
  const [chatId, setChatId] = useState(null);
  const [newMessageClient, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [otherUser, setOtherUser] = useState({});
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  var socket = io(baseUrl);
  useEffect(() => {
    const fetchMessages = async () => {
      const { messages } = await getAllMessages(chatId);
      if (messages) {
        setMessages([...messages]);
      }
    };
    fetchMessages();
  }, [chatId, messages]);
  useEffect(() => {
    const fetchOtherUserDetails = async () => {
      const { chat, message } = await AccessChat(userId);
      if (chat) {
        setChatId(chat._id);
      } else {
        console.log(message);
      }
      const { profile } = await GetSpecificUser(userId);
      setOtherUser(profile);
    };
    fetchOtherUserDetails();
  }, []);
  useEffect(() => {
    socket.emit("setup", userContext.userState.user);
    socket.on("connected", () => setSocketConnected(true));
    socket.emit("join chat", chatId);
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, [chatId, userContext]);
  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (chatId !== newMessageRecieved.chat._id) {
        // if (!notification.includes(newMessageRecieved)) {
        //   setNotification([newMessageRecieved, ...notification]);
        //   setFetchAgain(!fetchAgain);
        // }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });
  const handleSendMessage = async (e) => {
    try {
      if (e.key === "Enter" && newMessageClient) {
        socket.emit("stop typing", chatId);
        const data = await sendMessage(newMessageClient, chatId);
        if (data.newMessage) {
          socket.emit("new message", data.newMessage);
          setMessages([...messages, data.newMessage]);
          setNewMessage("");
        } else {
          console.log(data.message);
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", chatId);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", chatId);
        setTyping(false);
      }
    }, timerLength);
  };
  return messages.length > 0 ? (
    <div className="px-10 md:py-4 flex flex-col md:gap-5 justify-between md:h-screen h-[calc(100vh-5rem)]">
      <div className="md:h-20 rounded-2xl flex p-3 cursor-pointer gap-4">
        <img
          src={otherUser?.profilePicture}
          className="w-12 h-12 rounded-full self-center"
        />
        <h3 className="self-center text-xl text-[#131725]">
          {otherUser?.userName}
        </h3>
      </div>

      <div className="flex flex-col justify-end flex-1  overflow-y-auto gap-5 py-3">
        {messages.map((message) => {
          if (message.sender._id == userContext.userState.user._id) {
            return (
              <UserText
                image={userContext.userState.user.profilePicture}
                content={message.content}
              />
            );
          } else if (message.sender._id == otherUser._id) {
            return (
              <OtherUserText
                image={otherUser.profilePicture}
                content={message.content}
              />
            );
          }
        })}
        {istyping ? (
          <OtherUserText
            image={otherUser.profilePicture}
            content={"typing..."}
          />
        ) : (
          <></>
        )}
      </div>
      <div className=" bg-[#1E1D1D] border border-white rounded-2xl flex py-5 px-8 cursor-pointer gap-5">
        <input
          type="text"
          className="self-center bg-inherit text-white w-full focus:outline-none"
          placeholder="Message"
          value={newMessageClient}
          onChange={typingHandler}
          onKeyDown={handleSendMessage}
        />
        <div className="flex self-center gap-3 text-white text-2xl">
          <AiOutlinePicture />
          <AiOutlineHeart />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col justify-center h-full border-l-2 text-center text-5xl">
      <h1>Your Messages appear here</h1>
    </div>
  );
}

export default Message;
