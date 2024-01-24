import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

function Contact() {
  var names = ["Fikayo", "Emma", "Ola"];
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
      <div className="flex flex-col gap-5 py-8">
        {names.map((name, index) => (
          <div
            key={index}
            className="bg-[#131313] rounded-2xl flex justify-between py-2 px-4 cursor-pointer gap-5"
          >
            <div className="flex gap-4">
              <img
                src={`/images/profile-${index + 1}.png`}
                className="w-12 h-12 self-center"
              />
              <div className="self-center gap-3">
                <h3 className="text-lg">{name}</h3>
                <span className="font-light text-sm text-[#B7B7B7]">
                  Active 2hrs ago
                </span>
              </div>
            </div>
            <span className="bg-btnColor self-center px-3 py-1.5 rounded-full ">
              2
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Contact;
