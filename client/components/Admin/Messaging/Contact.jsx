"use client";
import {
  getChats,
  getUnreadChats
} from "@/components/Controllers/MessageController";
import { GetAPic } from "@/components/Controllers/PicturesController";
import { GetProfile } from "@/components/Controllers/ProfileController";
import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Link from "next/link";
function Contact({ profile }) {
  const [contacts, setContacts] = useState([]);
  const GetContacts = (chats) => {
    try {
      console.log(chats);
      var contactDetails;
      chats.map(async (chat) => {
        const { profile } = await GetProfile(chat.receiver);
        const { picture } = await GetAPic(profile.pictures, 1);
        const { unread } = await getUnreadChats(chat._id);
        contactDetails = { ...profile, picture, unread, chatId: chat._id };
        setContacts([...contacts, contactDetails]);
      });
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    const fetchChats = async () => {
      const { allChats } = await getChats(profile._id);
      if (allChats[0] == null) {
        setContacts(null);
        console.log("1");
      } else {
        GetContacts(allChats);
        console.log("2");
      }
    };
    fetchChats();
  }, []);
  return (
    <div className="bg-[#171717] text-white w-[600px] px-5 py-12 h-screen">
      <div className="space-y-4">
        <h1 className="text-xl ">Messages</h1>
        <div className="bg-white/10 py-2.5 rounded-xl flex px-5">
          <AiOutlineSearch className="self-center text-2xl text-slate-200" />
          <input
            type="search"
            className="self-center bg-white/0 w-full px-2 focus:outline-none"
            placeholder="Search here..."
          />
        </div>
      </div>
      {contacts ? (
        <div className="flex flex-col gap-5 py-8">
          {contacts?.map((contact, index) => (
            <Link
              href={`/admin/messaging/${contact.chatId}`}
              key={index}
              className="bg-[#131313] rounded-2xl flex justify-between py-2 px-4 cursor-pointer gap-5"
            >
              <div className="flex gap-4">
                <img
                  src={contact.picture}
                  className="w-12 h-12 rounded-full self-center"
                />
                <div className="self-center gap-3">
                  <h3 className="text-lg">{contact.userName}</h3>
                  <span className="font-light text-sm text-[#B7B7B7]">
                    Active 2hrs ago
                  </span>
                </div>
              </div>
              <span className="bg-btnColor self-center px-3 py-1.5 rounded-full ">
                {contact.unread.length}
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-5 py-4">
          <Link
            href="/amin/messsaging"
            className="bg-[#131313] rounded-2xl flex justify-between px-4 cursor-pointer gap-5"
          >
            <div className="flex gap-4 py-4">
              <img
                src="/images/profile-1.png"
                className="w-12 h-12 rounded-full self-center"
              />
              <div className="self-center gap-3">
                <h3 className="text-lg">Hibuddy</h3>
              </div>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Contact;
