"use client";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Link from "next/link";
function Contact() {
  return (
    <div className="px-5  py-12 h-screen">
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
    </div>
  );
}

export default Contact;
