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
    <div className="bg-[#171717] flex flex-col w-full h-full py-10 text-white text-center ">
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
            className="group rounded-3xl mx-auto w-[22rem] h-[36rem] bg-[#1E1D1D] relative p-2"
          >
            <img
              src="/images/displayPic.png"
              className="self-center rounded-3xl top-0 left-0 absolute object-cover w-full h-full"
              alt="Display picture"
            />
            <div className="absolute text-white space-y-3 left-0 mx-auto w-full bottom-0">
              <div className="hidden group-hover:flex justify-center gap-5">
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
              <div className="bg-[#1E1D1D] font-light text-center rounded-3xl py-4 flex flex-col justify-between gap-5">
                <h2 className="text-2xl">Sanjo</h2>
                <p>Life is a mission, we run it!</p>
                <button className="bg-btnColor px-14 rounded-xl py-2.5 mx-auto">
                  Let's chat
                </button>
                <span className="block cursor-pointer underline">
                  Vew profile
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
