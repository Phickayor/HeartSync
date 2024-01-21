import React from "react";
import {
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineMessage,
  AiOutlineSetting
} from "react-icons/ai";

function ActivityBar() {
  return (
    <div className="bg-black w-fit h-full flex flex-col py-28 gap-6 px-2 text-white">
      <div className="self-center hover:bg-btnColor px-6 py-4 rounded-xl duration-300">
        <AiOutlineHome className="text-3xl" />
      </div>
      <div className="self-center hover:bg-btnColor px-6 py-4 rounded-xl duration-300">
        <AiOutlineMessage className="text-3xl" />
      </div>
      <div className="self-center hover:bg-btnColor px-6 py-4 rounded-xl duration-300">
        <AiOutlineSetting className="text-3xl" />
      </div>    
      <div className="self-center hover:bg-btnColor px-6 py-4 rounded-xl duration-300">
        <AiOutlineLogout className="text-3xl" />
      </div>
    </div>
  );
}

export default ActivityBar;
