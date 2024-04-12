"use client";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Link from "next/link";
import { getAllChats } from "@/components/Controllers/ChatController";
import { UserContext } from "@/contexts/UserContext";
import ChatLoader from "@/Loaders/ChatLoader";
function Contact() {
  const [chats, setChats] = useState(null);
  const userContext = useContext(UserContext);
  useEffect(() => {
    const fetchChats = async () => {
      const { userChats } = await getAllChats();
      setChats(userChats);
    };
    fetchChats();
  }, []);

  return (
    <div className="px-5 w-full md:h-screen h-[calc(100vh-5rem)] overflow-hidden max-h-screen">
      <div className="space-y-4 pt-10 sticky top-0  backdrop-blur">
        <h1 className="text-xl ">Messages</h1>
        <div className="bg-[#131725] text-white py-4 rounded-xl flex px-5">
          <AiOutlineSearch className="self-center text-2xl text-slate-200" />
          <input
            type="search"
            className="self-center bg-inherit w-full px-2 focus:outline-none"
            placeholder="Search here..."
          />
        </div>
      </div>

      {chats ? (
        chats.length > 0 ? (
          <div className="flex flex-col gap-2 h-full py-4">
            {chats.map((chat, index) => {
              try {
                for (var i = 0; i < chat.users.length; i++) {
                  if (chat.users[i]._id != userContext.userState?._id) {
                    return (
                      <Link
                        key={index}
                        href={`/admin/messaging/?userId=${chat.users[i]._id}`}
                        className="rounded-2xl flex justify-between px-4 cursor-pointer gap-5"
                      >
                        <div className="flex gap-4 py-4">
                          <img
                            src={chat.users[i].profilePicture}
                            className="w-12 h-12 rounded-full self-center"
                          />
                          <div className="self-center gap-3">
                            <h3 className="text-lg">
                              {chat.users[i].userName}
                            </h3>
                            <span>{chat.latestMessage.content}</span>
                          </div>
                        </div>
                        <div className="bg-btnColor self-center w-8 h-8 text-center text-white rounded-full flex flex-col justify-center">
                          <span className="">2</span>
                        </div>
                      </Link>
                    );
                  }
                }
              } catch (error) {
                console.log(error.message);
              }
            })}
          </div>
        ) : (
          <div className="h-full">
            <h3 className="py-20 text-2xl text-center">
              Your Chats appear here
            </h3>
          </div>
        )
      ) : (
        <ChatLoader />
      )}
    </div>
  );
}

export default Contact;
