"use client";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Link from "next/link";
import { UserContext } from "@/contexts/UserContext";
import ChatLoader from "@/loader/ChatLoader";
import { getAllChats } from "@/components/Controllers/ChatController";
import { capitalize } from "@/utilities/firstLetterCaps";
function Contact() {
  const userContext = useContext(UserContext);
  const [chats, setChats] = useState(null);
  const [filteredChats, setFilteredChats] = useState(null);

  const handleSearch = (input) => {
    if (input) {
      // setSearching(true);
      let filter = chats?.filter((result) =>
        result.chat.users[1].userName.includes(input.toLowerCase())
      );
      console.log("filter ", filter);
      setFilteredChats(filter);
      // setSearching(false);
    } else {
      setFilteredChats(chats);
    }
  };
  useEffect(() => {
    const fetchChats = async () => {
      const { chats } = await getAllChats();
      setChats(chats);
      setFilteredChats(chats);
    };
    fetchChats();
  }, []);

  return (
    <div className="px-5 w-full lg:h-screen h-[calc(100vh-3.5rem)] overflow-hidden max-w-screen max-h-screen">
      <div className="space-y-4 pt-10 sticky top-0  backdrop-blur">
        <h1 className="text-xl">Messages</h1>
        <div className="bg-[#202020] mx-auto md:w-96 w-full text-white rounded-xl flex px-5 [&>*]:self-center">
          <AiOutlineSearch className="self-center text-xl md:text-2xl text-slate-200" />
          <input
            type="search"
            onChange={(e) => handleSearch(e.target.value)}
            className="py-3 rounded-lg font-light bg-[#202020] px-2 md:px-5 w-full focus:outline-none"
            placeholder="Search here..."
          />
        </div>
      </div>

      {filteredChats ? (
        filteredChats.length > 0 ? (
          <div className="flex flex-col gap-4 py-8">
            {filteredChats.map((chat) => {
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
                        className="rounded-2xl flex justify-between px-4 cursor-pointer bg-[#202020] hover:border gap-5 "
                      >
                        <div className="flex gap-4 py-3 ">
                          <img
                            src={chat.chat.users[i].profilePicture}
                            className="size-12 rounded-full self-center"
                          />
                          <div className="self-center space-y-3 max-w-72 md:max-w-96 lg:max-w-60 truncate overflow-hidden">
                            <h3 className="">
                              {capitalize(chat.chat.users[i].userName)}
                            </h3>
                            <span className="font-extralight text-sm">
                              {chat.chat.latestMessage.content}
                            </span>
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
