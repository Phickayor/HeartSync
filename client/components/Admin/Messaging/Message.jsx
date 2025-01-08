"use client";
import baseUrl from "@/config/server";
import io from "socket.io-client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { GetSpecificUser } from "@/components/Controllers/UserController";
import Link from "next/link";
import { UserContext } from "@/contexts/UserContext";
import { AccessChat } from "@/components/Controllers/ChatController";
import {
  getAllMessages,
  markAsRead,
  sendMessage
} from "@/components/Controllers/MessageController";
import { capitalize } from "@/utilities/firstLetterCaps";
import MessageLoader from "@/loader/MessageLoader";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import socket from "@/config/socket";

export const UserText = ({ image, content }) => {
  return content ? (
    <div className="flex gap-2 justify-end self-end w-10/12">
      <div className="bg-[#202020] rounded-l-3xl rounded-tr-3xl flex py-4 px-6 cursor-pointer gap-5 w-fit">
        <span className="text-white text-sm md:text-base">{content}</span>
      </div>
      <img src={image} className="size-8 md:size-12 rounded-full self-end" />
    </div>
  ) : (
    <div className="flex gap-2 justify-end self-end w-10/12">
      <div className="bg-[#202020] card-skeleton rounded-l-3xl rounded-tr-3xl flex w-1/2 py-8 cursor-pointer gap-5 max-w-96">
        <h3 className="text-white">{content}</h3>
      </div>
      <div className="size-10 md:size-12 bg-slate-400 card-skeleton rounded-full self-end"></div>
    </div>
  );
};
export const OtherUserText = ({ image, content }) => {
  return content ? (
    <div className="flex gap-2 w-10/12">
      <img src={image} className="size-8 md:size-12 self-end rounded-full" />
      <div className="bg-[#202020] rounded-r-3xl rounded-tl-3xl flex py-4 px-6 cursor-pointer gap-5 max-w-96">
        <h3 className="text-white text-sm md:text-base">{content}</h3>
      </div>
    </div>
  ) : (
    <div className="flex gap-2">
      <div className="size-10 md:size-12 bg-[#202020] card-skeleton rounded-full self-end"></div>
      <div className="bg-slate-400 card-skeleton rounded-l-full rounded-tr-full flex w-1/2 py-8 cursor-pointer gap-5 max-w-96">
        <h3 className="text-white">{content}</h3>
      </div>
    </div>
  );
};

function Message({ userId, setNotifications }) {
  const userContext = useContext(UserContext);
  const messagesEndRef = useRef();
  const [chatId, setChatId] = useState(null);
  const [newMessageClient, setNewMessageClient] = useState("");
  const [messages, setMessages] = useState(null);
  const [otherUser, setOtherUser] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    const fetchMessages = async () => {
      if (!chatId) return;
      try {
        const token = Cookies.get("token");
        const { messages } = await getAllMessages(chatId, token);
        if (messages) {
          setMessages(messages);
        }
      } catch (error) {
        console.error("Error fetching messages:", error.message);
      }
    };

    fetchMessages();
  }, [chatId]);

  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchOtherUserDetails = async () => {
      setLoader(true);
      const token = Cookies.get("token");
      try {
        const data = await AccessChat(userId, token);
        if (data?.chat) {
          setChatId(data.chat._id);
          const { profile } = await GetSpecificUser(userId);
          setOtherUser(profile);
        }
      } catch (error) {
        console.error("Error fetching other user details:", error.message);
      } finally {
        setLoader(false);
      }
    };

    if (userId) fetchOtherUserDetails();
  }, [userId]);

  useEffect(() => {
    if (userContext.userState && chatId) {
      socket.emit("setup", userContext.userState._id);
      socket.emit("join chat", userContext.userState._id, chatId);

      const handleMessageReceived = async (newMessageReceived) => {
        setNotifications((notifications) => notifications + 1);
        if (chatId === newMessageReceived.chat._id) {
          setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
        }
      };

      socket.on("message received", handleMessageReceived);

      return () => {
        socket.off("message received", handleMessageReceived);
        socket.off("connected");
      };
    }
  }, [chatId, userContext]);
  useEffect(() => {
    socket.on("new notification", (data) => {
      setNotifications((notifications) => notifications + 1);
    });
    socket.on("typing", () => {
      setIsTyping(true);
    });

    return () => {
      setIsTyping(false);
      socket.off("new notification");
      socket.off("typing");
    };
  }, [socket]);

  const handleSendMessage = async () => {
    try {
      let newMessage = newMessageClient;
      setNewMessageClient("");
      if (newMessage) {
        const token = Cookies.get("token");
        await sendMessage(newMessage, chatId, token).then((data) => {
          socket.emit("new message", data.newMessage);
          setMessages([...messages, data.newMessage]);
          const receiver = data.newMessage.chat.users.find(
            (user) => user._id !== userContext.userState?._id
          );
          if (receiver) {
            socket.emit("new notification", { receiverId: receiver._id });
          }
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  if ((!messages && userId) || loader) {
    return <MessageLoader />;
  }
  if (!userId) {
    return (
      <div className="flex flex-col justify-center lg:h-screen h-[calc(100vh-3.5rem)] text-center text-2xl lg:text-3xl">
        <h1>Your Messages would appear here</h1>
      </div>
    );
  }

  return (
    <div className="p-5 lg:px-10 flex flex-col lg:gap-5 justify-between lg:h-screen h-[calc(100vh-3.5rem)]">
      <Link
        href={`/profile/${userId}`}
        className="lg:h-20 rounded-2xl flex p-3 cursor-pointer gap-4"
      >
        <img
          src={otherUser?.profilePicture}
          className="size-10 md:size-12 rounded-full self-center"
        />
        <h3 className="self-center text-xl text-white">
          {otherUser && capitalize(otherUser?.userName)}
        </h3>
      </Link>

      <div className="flex flex-col flex-1 overflow-x-hidden overflow-y-auto gap-5 py-3">
        {messages.length > 0 ? (
          messages.map((message) => {
            if (message.sender._id == userContext.userState?._id) {
              return (
                <UserText
                  key={message._id}
                  image={userContext.userState?.profilePicture}
                  content={message.content}
                />
              );
            } else if (message.sender._id == otherUser._id) {
              return (
                <OtherUserText
                  key={message._id}
                  image={otherUser.profilePicture}
                  content={message.content}
                />
              );
            }
          })
        ) : (
          <div className="flex flex-col justify-center lg:h-screen h-[calc(100vh-3.5rem)] text-center text-2xl lg:text-3xl">
            <h1>No Messages so far. Your Messages would appear here</h1>
          </div>
        )}
        {isTyping && (
          <div className="flex gap-2">
            <div className="size-10 md:size-12 bg-[#202020] card-skeleton rounded-full self-end"></div>
            <div className="bg-slate-400 card-skeleton rounded-l-full rounded-tr-full flex w-1/2 py-8 cursor-pointer gap-5 max-w-96">
              <h3 className="text-white">typing...</h3>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="bg-[#202020] px-5 rounded-2xl flex cursor-pointer gap-5">
        <input
          type="text"
          className="py-3 rounded-lg font-light bg-[#202020] px-2 w-full focus:outline-none"
          placeholder="Message"
          value={newMessageClient}
          onChange={(e) => {
            setNewMessageClient(e.target.value);
            socket.on("typing", () => {
              setIsTyping(true);
            });
          }}
          onKeyDown={(e) => e.key == "Enter" && handleSendMessage()}
        />
        <div className="flex self-center gap-3 text-white text-2xl">
          <AiOutlineSend onClick={handleSendMessage} />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Message;
