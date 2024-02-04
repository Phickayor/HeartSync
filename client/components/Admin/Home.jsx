import React from "react";
import {
  AiFillHeart,
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineSearch
} from "react-icons/ai";

function Home() {
  const arr = ["", "", "", ""];

  return (
    <div className="bg-[#171717] flex flex-col  py-10 text-white text-center ">
      <div className="bg-white/10 py-3 rounded-md flex mx-20 w-96 px-5">
        <AiOutlineSearch className="self-center text-xl text-slate-200" />
        <input
          type="search"
          className="self-center bg-white/0 w-full px-2 focus:outline-none"
          placeholder="Search here..."
        />
      </div>
      <div className=" mx-auto w-11/12 pt-10 flex gap-8 flex-1 overflow-x-auto">
        {arr.map(() => (
          <div className="relative group bg-[#242424] flex flex-col h-full rounded-3xl">
            {/* <div className="grid grid-cols-3 p-8 gap-4">
            <div className="py-1 rounded-full bg-white"></div>
            <div className="py-1 rounded-full bg-white"></div>
            <div className="py-1 rounded-full bg-white"></div>
          </div> */}
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
