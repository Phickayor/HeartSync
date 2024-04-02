"use client";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Link from "next/link";
function Contact() {
  const contacts = ["", "", "", "", "", "", "", "", "", ""];
  return (
    <div className="px-5 w-full h-full overflow-auto max-h-screen">
      <div className="space-y-4 pt-10 sticky top-0  backdrop-blur">
        <h1 className="text-xl ">Messages</h1>
        <div className="bg-[#131725] py-4 rounded-xl flex px-5">
          <AiOutlineSearch className="self-center text-2xl text-slate-200" />
          <input
            type="search"
            className="self-center bg-inherit w-full px-2 focus:outline-none"
            placeholder="Search here..."
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 h-full py-4">
        {contacts.map((contact, index) => (
          <Link
            key={index}
            href="/admin/messaging"
            className="rounded-2xl flex justify-between px-4 cursor-pointer gap-5"
          >
            <div className="flex gap-4 py-4">
              <img
                src="/images/profile-1.png"
                className="w-12 h-12 rounded-full self-center"
              />
              <div className="self-center gap-3">
                <h3 className="text-lg">Hibuddy</h3>
                <span>Active 2hrs ago</span>
              </div>
            </div>
            <div className="bg-btnColor self-center w-8 h-8 text-center text-white rounded-full flex flex-col justify-center">
              <span className="">2</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Contact;
