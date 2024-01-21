import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

function Contact() {
  var names = ["Fikayo", "Emma", "Ola"];
  return (
    <div className="bg-[#171717] text-white w-[500px] px-5 py-12 h-screen">
      <div className="space-y-4">
        <h1 className="text-2xl ">Messages</h1>
        <div className="bg-white/10 py-3 rounded-xl flex px-5">
          <AiOutlineSearch className="self-center text-2xl text-slate-200" />
          <input
            type="search"
            className="self-center bg-white/0 w-full text-lg px-2 focus:outline-none"
            placeholder="Search here..."
          />
        </div>
      </div>
      <div className="flex flex-col gap-6 py-8">
        {names.map((name, index) => (
          <div key={index} className="bg-[#131313] rounded-2xl flex p-4 cursor-pointer gap-5">
            <img src={`/images/profile-${index+1}.png`} className="w-16 h-16  self-center"/>
            <div className="self-center gap-3">
              <h3 className="text-2xl">{name}</h3>
              <span className="font-light text-[#B7B7B7]">Active 2hrs ago</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Contact;
