"use client";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Link from "next/link";
import { UserContext } from "@/contexts/UserContext";
import ChatLoader from "@/Loaders/ChatLoader";
import { getAllChats } from "@/components/Controllers/ChatController";
import { capitalize } from "@/utilities/firstLetterCaps";
function Contact() {
  const userContext = useContext(UserContext);
  const [chats, setChats] = useState(null);
  const fetchChats = async () => {
    const { chats } = await getAllChats();
    setChats(chats);
    console.log(chats);
  };
  useEffect(() => {
    fetchChats();
  }, []);
  return (
    <div className="px-5 w-full lg:h-screen h-[calc(100vh-5rem)] overflow-hidden max-h-screen">
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
            {chats.map((chat) => {
              try {
                for (let i = 0; i < chat.chat.users.length; i++) {
                  if (chat.chat.users[i]._id != userContext.userState?._id) {
                    let unread = chat.unread.filter(
                      (message) => message.sender !== userContext.userState?._id
                    ).length;
                    return (
                      <Link
                        key={chat.chat._id}
                        href={`/admin/messaging/?userId=${chat.chat.users[i]._id}`}
                        className="rounded-2xl flex justify-between px-4 cursor-pointer gap-5"
                      >
                        <div className="flex gap-4 py-4">
                          <img
                            src={chat.chat.users[i].profilePicture}
                            className="w-12 h-12 rounded-full self-center"
                          />
                          <div className="self-center gap-3">
                            <h3 className="text-lg">
                              {capitalize(chat.chat.users[i].userName)}
                            </h3>
                            <span>{chat.chat.latestMessage.content}</span>
                          </div>
                        </div>
                        {unread > 0 && (
                          <div className="bg-btnColor self-center w-8 h-8 text-center text-white rounded-full flex flex-col justify-center">
                            <span className="">{unread}</span>
                          </div>
                        )}
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
