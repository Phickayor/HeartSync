"use client";
import baseUrl from "@/config/server";
import io from "socket.io-client";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  AiOutlineHeart,
  AiOutlinePicture,
  AiOutlineSend
} from "react-icons/ai";
import { GetSpecificUser } from "@/components/Controllers/UserController";
import Link from "next/link";
import { UserContext } from "@/contexts/UserContext";
import { AccessChat } from "@/components/Controllers/ChatController";
import {
  getAllMessages,
  sendMessage
} from "@/components/Controllers/MessageController";
import { capitalize } from "@/utilities/firstLetterCaps";
import MessageLoader from "@/Loaders/MessageLoader";

export const UserText = ({ image, content }) => {
  return content ? (
    <div className="flex gap-2 justify-end">
      <div className="bg-[#1E1D1D] rounded-l-full rounded-tr-full flex py-4 px-6 cursor-pointer gap-5 max-w-96">
        <h3 className="text-white">{content}</h3>
      </div>
      <img src={image} className="w-12 h-12 rounded-full self-end" />
    </div>
  ) : (
    <div className="flex gap-2 justify-end">
      <div className="bg-slate-400 card-skeleton rounded-l-full rounded-tr-full flex w-1/2 py-8 cursor-pointer gap-5 max-w-96">
        <h3 className="text-white">{content}</h3>
      </div>
      <div className="w-12 h-12 bg-slate-400 card-skeleton rounded-full self-end"></div>
    </div>
  );
};
export const OtherUserText = ({ image, content }) => {
  return content ? (
    <div className="flex gap-2">
      <img src={image} className="w-12 h-12 self-end rounded-full" />
      <div className="bg-[#1E1D1D] rounded-r-full rounded-tl-full flex py-4 px-6 cursor-pointer gap-5 max-w-96">
        <h3 className="text-white">{content}</h3>
      </div>
    </div>
  ) : (
    <div className="flex gap-2">
      <div className="w-12 h-12 bg-slate-400 card-skeleton rounded-full self-end"></div>
      <div className="bg-slate-400 card-skeleton rounded-l-full rounded-tr-full flex w-1/2 py-8 cursor-pointer gap-5 max-w-96">
        <h3 className="text-white">{content}</h3>
      </div>
    </div>
  );
};

function Message({
  userId,
  fetchAgain,
  setFetchAgain,
  notifications,
  setNotifications
}) {
  const userContext = useContext(UserContext);
  const messagesEndRef = useRef();
  const [chatId, setChatId] = useState(null);
  const [newMessageClient, setNewMessage] = useState("");
  const [messages, setMessages] = useState(null);
  const [otherUser, setOtherUser] = useState({});
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [loader, setLoader] = useState(false);
  var socket = io(baseUrl);
  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    const fetchMessages = async () => {
      try {
        if (chatId) {
          const { messages } = await getAllMessages(chatId);
          if (messages) {
            setMessages([...messages]);
            notifications.map((notification, index) => {
              if (notification.chat._id == chatId) {
                notifications.splice(index, 1);
              }
            });
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchMessages();
    scrollToBottom();
  }, [chatId, messages]);
  useEffect(() => {
    const fetchOtherUserDetails = async () => {
      setLoader(true);
      const { chat, message } = await AccessChat(userId);
      if (chat) {
        setChatId(chat._id);
      } else {
        console.log(message);
      }
      const { profile } = await GetSpecificUser(userId);
      setOtherUser(profile);
      setLoader(false);
    };

    fetchOtherUserDetails();
  }, [userId]);
  useEffect(() => {
    if (userContext.userState && chatId) {
      socket.emit("setup", userContext.userState);
      socket.on("connected", () => setSocketConnected(true));
      socket.emit("join chat", chatId);
      socket.on("typing", () => setIsTyping(true));
      socket.on("stop typing", () => setIsTyping(false));
    }
  }, [chatId, userContext]);
  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      alert("got here");

      if (newMessageReceived) {
        console.log(newMessageReceived);
        if (chatId !== newMessageReceived.chat._id) {
          if (!notifications.includes(newMessageReceived)) {
            setNotifications([...notifications, newMessageReceived]);
            setFetchAgain(!fetchAgain);
          }
        } else {
          if (newMessageReceived) {
            alert("got here");
            setMessages([...messages, newMessageReceived]);
            setFetchAgain(!fetchAgain);
          }
        }
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
  if ((!messages && userId) || loader) {
    return <MessageLoader />;
  }
  if (!userId) {
    return (
      <div className="flex flex-col justify-center lg:h-screen h-[calc(100vh-5rem)] text-center text-2xl lg:text-3xl">
        <h1>Your Messages would appear here</h1>
      </div>
    );
  }

  return (
    <div className="px-5 lg:px-10 lg:py-4 flex flex-col lg:gap-5 justify-between lg:h-screen h-[calc(100vh-5rem)]">
      <Link
        href={`/profile/${userId}`}
        className="lg:h-20 rounded-2xl flex p-3 cursor-pointer gap-4"
      >
        <img
          src={otherUser?.profilePicture}
          className="w-12 h-12 rounded-full self-center"
        />
        <h3 className="self-center text-xl text-[#131725]">
          {otherUser && capitalize(otherUser?.userName)}
        </h3>
      </Link>

      <div className="flex flex-col flex-1  overflow-y-auto gap-5 py-3">
        {messages.length > 0 ? (
          messages.map((message, index) => {
            if (message.sender._id == userContext.userState?._id) {
              return (
                <UserText
                  key={index}
                  image={userContext.userState?.profilePicture}
                  content={message.content}
                />
              );
            } else if (message.sender._id == otherUser._id) {
              return (
                <OtherUserText
                  key={index}
                  image={otherUser.profilePicture}
                  content={message.content}
                />
              );
            }
          })
        ) : (
          <div className="flex flex-col justify-center lg:h-screen h-[calc(100vh-5rem)] text-center text-2xl lg:text-3xl">
            <h1>No Messages so far. Your Messages would appear here</h1>
          </div>
        )}

        <div ref={messagesEndRef} />
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
          {/* <AiOutlinePicture />
          <AiOutlineHeart /> */}
          <AiOutlineSend />
        </div>
      </div>
    </div>
  );
}

export default Message;
