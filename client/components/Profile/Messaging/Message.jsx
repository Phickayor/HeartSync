import React from "react";
import { AiOutlineHeart, AiOutlinePicture } from "react-icons/ai";

function Message() {
  return (
    <div className="bg-[#161616] p-10 flex flex-col gap-5 justify-between w-full">
      <div className="bg-[#1E1D1D] rounded-2xl flex p-4 cursor-pointer gap-5">
        <img src="/images/profile-2.png" className="w-16 h-16 self-center" />
        <h3 className="self-center text-2xl text-white">Fikayo</h3>
      </div>
      
      <div className="flex flex-col gap-5 flex-1 py-3 overflow-y-auto">
        <div className="flex gap-2 justify-end">
          <div className="bg-[#1E1D1D] rounded-2xl flex p-4 cursor-pointer gap-5 w-96 h-32 ">
            {/* <h3 className="text-2xl text-white"></h3> */}
          </div>
          <img src="/images/profile-2.png" className="w-12 h-12 self-end" />
        </div>
        <div className="flex gap-2">
          <img src="/images/profile-2.png" className="w-12 h-12 self-end" />
          <div className="bg-[#1E1D1D] rounded-2xl flex p-4 cursor-pointer gap-5 w-96 h-24 ">
            {/* <h3 className="text-2xl text-white"></h3> */}
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          <div className="bg-[#1E1D1D] rounded-2xl flex p-4 cursor-pointer gap-5 w-96 h-16 ">
            {/* <h3 className="text-2xl text-white"></h3> */}
          </div>
          <img src="/images/profile-2.png" className="w-12 h-12 self-end" />
        </div>
        <div className="flex gap-2">
          <img src="/images/profile-2.png" className="w-12 h-12 self-end" />
          <div className="bg-[#1E1D1D] rounded-2xl flex p-4 cursor-pointer gap-5 w-96 h-16 ">
            {/* <h3 className="text-2xl text-white"></h3> */}
          </div>
        </div>
      </div>

      <div className="bg-[#1E1D1D] border border-white rounded-2xl flex py-5 px-8 cursor-pointer gap-5">
        <input
          type="text"
          className="self-center bg-white/0 text-white w-full text-lg px-2 focus:outline-none"
          placeholder="Message"
        />
        <div className="flex self-center gap-3 text-white text-2xl">
          <AiOutlinePicture />
          <AiOutlineHeart />
        </div>
      </div>
    </div>
  );
}

export default Message;
