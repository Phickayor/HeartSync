"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  AiFillHeart,
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineSearch
} from "react-icons/ai";

function Home() {
  const router = useRouter();
  const arr = ["", "", "", ""];
  const [searchTerm, setSearchTerm] = useState(null);
  const handleSearch = () => {
    router.push(`/profile/${searchTerm}`);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className="bg-[#171717] flex flex-col w-full  py-10 text-white text-center ">
      <div className="bg-white/10 py-3 rounded-md flex mx-auto w-10/12 px-5">
        <AiOutlineSearch className="self-center text-xl text-slate-200" />
        <input
          type="search"
          className="self-center bg-white/0 w-full px-2 focus:outline-none"
          placeholder="Search here..."
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </div>
      <div className=" mx-auto w-11/12 pt-10 flex gap-8 flex-1 overflow-x-auto ">
        {arr.map((ar, index) => (
          <div
            key={index}
            className="relative group bg-[#242424] flex flex-col h-full rounded-3xl"
          >
            <img
              src="/images/displayPic.png"
              alt="Display Picture"
              className="min-w-[22rem] flex-1 rounded-3xl object-cover"
            />
            <div className="absolute rounded-3xl -bottom-1 w-full bg-[#1E1D1D] text-center py-5 space-y-3">
              <div className="absolute hidden w-full duration-300 -top-8 group-hover:flex justify-center gap-5 text-2xl">
                <div className="cursor-pointer border border-dashed bg-btnColor hover:bg-red-700 rounded-full p-5">
                  <AiOutlineClose className="self-center" />
                </div>
                <div className="cursor-pointer border border-dashed bg-btnColor hover:bg-red-500 rounded-full p-5">
                  <AiFillHeart className="self-center" />
                </div>
                <div className="cursor-pointer border border-dashed bg-btnColor hover:bg-green-500 rounded-full p-5">
                  <AiOutlineCheck className="self-center" />
                </div>
              </div>
              <h2 className="text-2xl font-semibold">Sanjo</h2>
              <p>Life is a mission, we run it!</p>
              <button className="bg-btnColor w-10/12 rounded-2xl py-2.5">
                Let's chat
              </button>
              <span className="block cursor-pointer underline">
                Vew profile
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
