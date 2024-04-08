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
  const arr = ["Fikayo", "Sanjo", "Musa"];
  const [searchTerm, setSearchTerm] = useState(null);
  var [index, setIndex] = useState(0);
  const handleSearch = () => {
    router.push(`/profile/${searchTerm}`);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  const [startX, setStartX] = useState(null);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (startX === null) return;

    const currentX = e.touches[0].clientX;
    const diffX = currentX - startX;

    // If the user swipes right (moving towards positive X direction)
    if (diffX > 0) {
      setIndex(index++);
      setStartX(null); // Reset startX after the swipe
    } else if (diffX < 0) {
      setIndex(index--);
      setStartX(null);
    }
  };

  return (
    <div className="flex pattern-background flex-col justify-center fixed h-[calc(100%-5rem)] max-h-[calc(100%-5rem)] md:max-h-full overflow-auto  w-full md:h-full md:py-10 text-white text-center ">
      <div className="hidden bg-[#1E1D1D] py-3 rounded-md md:flex mx-auto w-10/12 px-5">
        <AiOutlineSearch className="self-center text-xl text-slate-200" />
        <input
          type="search"
          className="self-center bg-white/0 w-full px-2 focus:outline-none"
          placeholder="Search here..."
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </div>
      <div className="flex-1 mx-auto w-11/12 py-5 md:py-10 grid md:grid-cols-3 gap-8 overflow-x-auto ">
        <div
          key={index}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          className="group self-center rounded-3xl mx-auto w-10/12 h-full md:w-[22rem] md:h-[36rem] bg-[#1E1D1D] relative p-2"
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
            <div className="bg-[#2c2626] font-light text-center rounded-3xl py-4 flex flex-col justify-between gap-5">
              <h2 className="text-2xl">{arr[index]}</h2>
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
      </div>
    </div>
  );
}

export default Home;
